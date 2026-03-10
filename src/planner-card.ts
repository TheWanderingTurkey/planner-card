import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { plannerStyles } from "./styles";
import { getLegibleTextColor, getStartOfWeek, formatDate, hexToRgba } from "./utils";
import "./planner-card-editor";

// Register the card with Home Assistant's visual editor
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
	type: "meal-activity-planner",
	name: "Meal & Activity Planner",
	description: "A 5-week planner for meals, chores, and activities.",
});

@customElement("meal-activity-planner")
export class MealActivityPlanner extends LitElement {
	// --- NEW RESPONSIVE STATES ---
	@state() private _forceViewMode: "auto" | "desktop" | "squeezed" | "agenda" = "auto";
	@state() private _cardWidth: number = 0;
	private _resizeObserver?: ResizeObserver;

	// Calculates the active layout based on overrides or actual pixel width
	private get _effectiveLayout() {
		if (this._forceViewMode !== "auto") return this._forceViewMode;
		if (this._cardWidth === 0) return "desktop";
		if (this._cardWidth < 500) return "agenda"; // iPhone portrait
		if (this._cardWidth < 800) return "squeezed"; // iPad portrait or split-screen
		return "desktop"; // Full monitor
	}

	static styles = plannerStyles;

	private _refreshInterval?: number;

	@property({ attribute: false }) public hass!: HomeAssistant;
	@property({ attribute: false }) private config!: any;

	@state() private _currentDate = new Date();
	@state() private _hiddenCalendars: Set<string> = new Set();
	@state() private _events: { [date: string]: any[] } = {};
	@state() private _weatherForecast: any[] = [];

	@state() private _dialogDate = "";
	@state() private _dialogCalendar = "";
	@state() private _dialogSummary = "";

	@state() private _dialogStartTime = "12:00";
	@state() private _dialogEndTime = "13:00";
	@state() private _dialogEventUid = ""; // If this has a value, we are editing!
	@state() private _isAllDayType = false;
	@state() private _isCustomEvent = false;

	private _hasScrolledToToday = false;

	@query("#eventDialog") _dialog!: HTMLDialogElement;

	static getConfigElement() {
		return document.createElement("meal-activity-planner-editor");
	}

	setConfig(config: any) {
		if (!config.calendars) throw new Error("Please define calendars.");
		this.config = { ...config };
	}

	connectedCallback() {
		super.connectedCallback();

		// Fetch data immediately on load!
		this._fetchData();

		// Then set up the timer to refresh it every 60 seconds
		this._refreshInterval = window.setInterval(() => {
			this._fetchData();
		}, 60000);
	}

	protected firstUpdated(changedProps: any) {
		if (super.firstUpdated) super.firstUpdated(changedProps);

		// Grab the actual ha-card, which properly reports width changes
		const cardEl = this.shadowRoot?.querySelector("ha-card");
		if (cardEl) {
			this._resizeObserver = new ResizeObserver((entries) => {
				const newWidth = entries[0].contentRect.width;
				// Check if the width actually changed
				if (newWidth > 0 && this._cardWidth !== newWidth) {
					this._cardWidth = newWidth;
				}
			});
			this._resizeObserver.observe(cardEl);
		}
	}

	disconnectedCallback() {
		if (this._refreshInterval) clearInterval(this._refreshInterval);
		if (this._resizeObserver) this._resizeObserver.disconnect();
		super.disconnectedCallback();
	}

	protected updated(changedProps: Map<string | number | symbol, unknown>) {
		super.updated(changedProps);

		// Automatically scroll to today when in Agenda view
		if (this._effectiveLayout === "agenda") {
			if (!this._hasScrolledToToday) {
				const todayEl = this.shadowRoot?.querySelector(".day-box.today");
				if (todayEl) {
					setTimeout(() => {
						// Scroll the internal grid container so "Today" is at the top
						todayEl.scrollIntoView({ behavior: "smooth", block: "start" });
					}, 150); // Tiny delay ensures the browser has finished painting the heights
					this._hasScrolledToToday = true;
				}
			}
		} else {
			// Reset the tracker if we leave Agenda view, so it scrolls again if we come back!
			this._hasScrolledToToday = false;
		}
	}

	private async _fetchData() {
		// 1. Await the weather FIRST so it's ready before drawing the grid
		await this._fetchWeather();

		// Get 1st of month, start of that week
		const startOfMonth = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), 1);
		const startDate = getStartOfWeek(startOfMonth);

		// Calculate 35 days (5 weeks) out
		const endDate = new Date(startDate);
		endDate.setDate(startDate.getDate() + 35);

		const startStr = startDate.toISOString();
		const endStr = endDate.toISOString();

		let allEvents: any[] = [];
		for (const cal of this.config.calendars) {
			if (this._hiddenCalendars.has(cal)) continue;
			try {
				const events = await this.hass.callApi("GET", `calendars/${cal}?start=${startStr}&end=${endStr}`);
				(events as any[]).forEach((e) => (e.calendar_id = cal));
				allEvents = [...allEvents, ...(events as any[])];
			} catch (err) {
				console.error("Failed to fetch calendar", cal, err);
			}
		}

		// Group by Date string (YYYY-MM-DD)
		const grouped = {};
		allEvents.forEach((e) => {
			const dateStr = e.start.date || e.start.dateTime.split("T")[0];
			if (!grouped[dateStr]) grouped[dateStr] = [];
			grouped[dateStr].push(e);
		});

		this._events = grouped;
	}

	private async _fetchWeather() {
		if (!this.config.weather_entity) return;

		const fetchForecast = async (forecastType: string) => {
			return await this.hass.callWS({
				type: "call_service",
				domain: "weather",
				service: "get_forecasts",
				service_data: { type: forecastType },
				target: { entity_id: this.config.weather_entity },
				return_response: true,
			});
		};

		try {
			let result;
			try {
				result = await fetchForecast("daily");
			} catch (err: any) {
				if (err.message && err.message.includes("does not support 'daily'")) {
					console.log(`Weather entity ${this.config.weather_entity} requires twice_daily.`);
					result = await fetchForecast("twice_daily");
				} else {
					throw err;
				}
			}

			// The correction: accessing result.response
			this._weatherForecast = result.response[this.config.weather_entity]?.forecast || [];
			this.requestUpdate();
		} catch (e) {
			console.error("Weather fetch failed. Error:", e);
		}
	}

	private _changeMonth(offset: number) {
		this._currentDate.setMonth(this._currentDate.getMonth() + offset);
		this._currentDate = new Date(this._currentDate); // Trigger reactive update
		this._fetchData();
	}

	private _toggleCalendar(cal: string) {
		this._hiddenCalendars.has(cal) ? this._hiddenCalendars.delete(cal) : this._hiddenCalendars.add(cal);
		this.requestUpdate();
		this._fetchData();
	}

	// Call this whenever the calendar dropdown changes
	private _updateCalendarSelection(cal: string) {
		this._dialogCalendar = cal;
		const cName = cal.toLowerCase();
		this._isAllDayType = ["food", "meal", "activit", "chore"].some((kw) => cName.includes(kw));
		this._isCustomEvent = false; // Reset custom flag when switching calendars
	}

	// Opens a blank dialog (The '+' Button)
	private _openDialog(dateStr: string) {
		this._dialogDate = dateStr;
		this._dialogSummary = "";
		this._dialogEventUid = ""; // Reset ID so HA knows it's a new event
		this._dialogStartTime = "12:00";
		this._dialogEndTime = "13:00";
		this._updateCalendarSelection(this.config.calendars[0]);
		this._dialog.showModal();
	}

	// Opens a populated dialog (Clicking an existing event)
	private _openEditDialog(ev: any, dateStr: string) {
		this._dialogDate = dateStr;
		this._dialogCalendar = ev.calendar_id;
		this._dialogSummary = ev.summary;
		this._dialogEventUid = ev.uid || ev.id; // Capture the event ID

		this._updateCalendarSelection(ev.calendar_id);

		// Check if the summary exists in the helper list. If not, it's a Custom event!
		const cName = ev.calendar_id.toLowerCase();
		let helperEntity = "";
		if (cName.includes("meal") || cName.includes("food")) helperEntity = "input_select.meals";
		else if (cName.includes("activit")) helperEntity = "input_select.activities";

		if (helperEntity && this.hass.states[helperEntity]) {
			const options = this.hass.states[helperEntity].attributes.options || [];
			if (ev.summary && !options.includes(ev.summary)) {
				this._isCustomEvent = true;
			}
		}

		// If it has a specific time, extract it to pre-fill the time boxes
		if (!this._isAllDayType && ev.start?.dateTime) {
			const startDate = new Date(ev.start.dateTime);
			const endDate = new Date(ev.end?.dateTime || ev.start.dateTime);
			this._dialogStartTime = startDate.toTimeString().slice(0, 5); // Grabs "HH:MM"
			this._dialogEndTime = endDate.toTimeString().slice(0, 5);
		} else {
			this._dialogStartTime = "12:00";
			this._dialogEndTime = "13:00";
		}

		this._dialog.showModal();
	}

	private _closeDialog() {
		this._dialog.close();
	}

	private async _saveEvent() {
		// 1. Intercept Wake calendar events to set defaults
		const isWakeCalendar = this._dialogCalendar.toLowerCase().includes("wake");
		const finalSummary = isWakeCalendar ? "Wake up" : this._dialogSummary;

		if (isWakeCalendar) {
			// Calculate exactly 1 hour after the chosen start time
			const start = new Date(`${this._dialogDate}T${this._dialogStartTime}:00`);
			const end = new Date(start.getTime() + 60 * 60 * 1000);
			this._dialogEndTime = end.toTimeString().slice(0, 5); // Update state to HH:MM
		}

		// --- BULLETPROOF NEXT-DAY MATH ---
		// Split the date string into exact local integers to bypass DST/Timezone bugs
		const [year, month, day] = this._dialogDate.split("-").map(Number);
		const nextDayObj = new Date(year, month - 1, day + 1);
		const nextDayStr = `${nextDayObj.getFullYear()}-${String(nextDayObj.getMonth() + 1).padStart(2, "0")}-${String(nextDayObj.getDate()).padStart(2, "0")}`;
		// ---------------------------------

		if (this._dialogEventUid) {
			// 2. EDITING: We must use the internal WebSocket API
			const eventPayload: any = {
				summary: finalSummary,
			};

			if (this._isAllDayType) {
				eventPayload.dtstart = this._dialogDate;
				eventPayload.dtend = nextDayStr; // Use the safe next day
			} else {
				const start = new Date(`${this._dialogDate}T${this._dialogStartTime}:00`);
				const end = new Date(`${this._dialogDate}T${this._dialogEndTime}:00`);
				eventPayload.dtstart = start.toISOString();
				eventPayload.dtend = end.toISOString();
			}

			await this.hass.callWS({
				type: "calendar/event/update",
				entity_id: this._dialogCalendar,
				uid: this._dialogEventUid,
				event: eventPayload,
			});
		} else {
			// 3. CREATING: We can use the standard HA service action
			const payload: any = {
				entity_id: this._dialogCalendar,
				summary: finalSummary,
			};

			if (this._isAllDayType) {
				payload.start_date = this._dialogDate;
				payload.end_date = nextDayStr; // Use the safe next day
			} else {
				payload.start_date_time = `${this._dialogDate} ${this._dialogStartTime}:00`;
				payload.end_date_time = `${this._dialogDate} ${this._dialogEndTime}:00`;
			}

			await this.hass.callService("calendar", "create_event", payload);
		}

		this._closeDialog();
		setTimeout(() => this._fetchData(), 1000);
	}

	private async _deleteEvent() {
		if (!this._dialogEventUid) return;

		// DELETING: Also requires the internal WebSocket API
		try {
			await this.hass.callWS({
				type: "calendar/event/delete",
				entity_id: this._dialogCalendar,
				uid: this._dialogEventUid,
			});
		} catch (e) {
			console.error("Failed to delete event:", e);
		}

		this._closeDialog();
		setTimeout(() => this._fetchData(), 1000);
	}

	render() {
		// Check the layout to determine if we need the short month (e.g., "Mar" instead of "March")
		const monthFormat = this._effectiveLayout === "agenda" ? "short" : "long";

		return html`
			<ha-card>
				<div class="header">
					<div class="header-left">
						<div class="month-nav">
							<ha-icon icon="mdi:chevron-left" class="clickable-icon" @click=${() => this._changeMonth(-1)}></ha-icon>
							<h2>${this._currentDate.toLocaleString("default", { month: monthFormat, year: "numeric" })}</h2>
							<ha-icon icon="mdi:chevron-right" class="clickable-icon" @click=${() => this._changeMonth(1)}></ha-icon>
						</div>

						<div class="view-toggles">
							<ha-icon
								icon="mdi:monitor-cellphone"
								class="${this._forceViewMode === "auto" ? "active" : ""}"
								@click=${() => (this._forceViewMode = "auto")}
								title="Auto Responsive"></ha-icon>
							<ha-icon
								icon="mdi:calendar-month"
								class="${this._forceViewMode === "desktop" ? "active" : ""}"
								@click=${() => (this._forceViewMode = "desktop")}
								title="Desktop Grid"></ha-icon>
							<ha-icon
								icon="mdi:view-column"
								class="${this._forceViewMode === "squeezed" ? "active" : ""}"
								@click=${() => (this._forceViewMode = "squeezed")}
								title="Squeezed Grid"></ha-icon>
							<ha-icon
								icon="mdi:view-agenda"
								class="${this._forceViewMode === "agenda" ? "active" : ""}"
								@click=${() => (this._forceViewMode = "agenda")}
								title="Agenda List"></ha-icon>
						</div>
					</div>

					<div class="toggles">
						${[...this.config.calendars] // Create a copy so we don't mess up the visual grid order
							.filter((cal: string) => !cal.toLowerCase().includes("wake"))
							.sort((a: string, b: string) => {
								// Sort alphabetically by friendly name
								const nameA = this.hass.states[a]?.attributes.friendly_name || a;
								const nameB = this.hass.states[b]?.attributes.friendly_name || b;
								return nameA.localeCompare(nameB);
							})
							.map((cal: string) => {
								const calIndex = this.config.calendars.indexOf(cal);
								const palette = ["#F44336", "#E91E63", "#9C27B0", "#3F51B5", "#03A9F4", "#009688", "#FF9800", "#795548"];
								const rawColor = this.config.colors?.[cal] || palette[calIndex % palette.length] || "#4caf50";
								const isHidden = this._hiddenCalendars.has(cal);

								return html`
									<ha-chip
										?outline=${isHidden}
										style="--ha-chip-background-color: transparent; --ha-chip-text-color: ${rawColor}; color: ${rawColor};"
										@click=${() => this._toggleCalendar(cal)}>
										<ha-icon slot="icon" .icon=${this.hass.states[cal]?.attributes.icon || "mdi:calendar"} style="color: ${rawColor} !important;"></ha-icon>
										${this.hass.states[cal]?.attributes.friendly_name}
									</ha-chip>
								`;
							})}
					</div>
				</div>

				<div class="layout-${this._effectiveLayout}">
					<div class="grid">${this._renderGrid()}</div>
				</div>

				<dialog id="eventDialog">
					<h3>${this._dialogEventUid ? "Edit Event" : "Add Event"} for ${this._dialogDate}</h3>

					<div class="dialog-row">
						<label>Calendar</label>
						<select
							@change=${(e: any) => {
								this._updateCalendarSelection(e.target.value);
								this._dialogSummary = "";
							}}
							.value=${this._dialogCalendar}
							?disabled=${this._dialogEventUid !== ""}>
							${[...this.config.calendars]
								.sort((a: string, b: string) => {
									const nameA = this.hass.states[a]?.attributes.friendly_name || a;
									const nameB = this.hass.states[b]?.attributes.friendly_name || b;
									return nameA.localeCompare(nameB);
								})
								.map((c: string) => html`<option value="${c}">${this.hass.states[c]?.attributes.friendly_name || c}</option>`)}
						</select>
					</div>

					${(() => {
						const isWakeCalendar = this._dialogCalendar.toLowerCase().includes("wake");
						return html`
							${!isWakeCalendar
								? html`
										<div class="dialog-row">
											<label>Event / Meal</label>
											${this._renderDynamicInput()}
										</div>
									`
								: ""}
							${!this._isAllDayType
								? html`
										<div class="dialog-row" style="display:flex; flex-direction:row; gap:8px;">
											<div style="flex:1; display:flex; flex-direction:column;">
												<label>Start Time</label>
												<input type="time" .value=${this._dialogStartTime} @input=${(e: any) => (this._dialogStartTime = e.target.value)} />
											</div>

											${!isWakeCalendar
												? html`
														<div style="flex:1; display:flex; flex-direction:column;">
															<label>End Time</label>
															<input type="time" .value=${this._dialogEndTime} @input=${(e: any) => (this._dialogEndTime = e.target.value)} />
														</div>
													`
												: ""}
										</div>
									`
								: ""}
						`;
					})()}

					<div style="display:flex; justify-content:space-between; margin-top:16px;">
						<div>
							${this._dialogEventUid ? html`<button @click=${this._deleteEvent} style="color: #ff5252; border-color: #ff5252; background: transparent;">Delete</button>` : ""}
						</div>
						<div style="display:flex; gap:8px;">
							<button @click=${this._closeDialog} style="background: transparent; border: 1px solid var(--divider-color); color: var(--primary-text-color);">Cancel</button>
							<button @click=${this._saveEvent} style="background: var(--primary-color); color: var(--text-primary-color); border: none;">Save</button>
						</div>
					</div>
				</dialog>
			</ha-card>
		`;
	}

	private _renderDynamicInput() {
		const calName = this._dialogCalendar.toLowerCase();
		let inputSelectEntity = "";

		if (calName.includes("meal") || calName.includes("food")) {
			inputSelectEntity = "input_select.meals";
		} else if (calName.includes("activit")) {
			inputSelectEntity = "input_select.activities";
		}

		if (inputSelectEntity && this.hass.states[inputSelectEntity]) {
			const options = this.hass.states[inputSelectEntity].attributes.options || [];

			// Handle dropdown changes
			const handleSelect = (e: any) => {
				if (e.target.value === "__CUSTOM__") {
					this._isCustomEvent = true;
					this._dialogSummary = ""; // Clear summary for new typing
				} else {
					this._isCustomEvent = false;
					this._dialogSummary = e.target.value;
				}
			};

			return html`
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<select @change=${handleSelect} .value=${this._isCustomEvent ? "__CUSTOM__" : this._dialogSummary}>
						<option value="" disabled selected>Select an option...</option>
						${options.map((opt: string) => html`<option value="${opt}">${opt}</option>`)}
						<option value="__CUSTOM__">Custom...</option>
					</select>

					${this._isCustomEvent
						? html` <input type="text" .value=${this._dialogSummary} @input=${(e: any) => (this._dialogSummary = e.target.value)} placeholder="Type custom event name..." /> `
						: ""}
				</div>
			`;
		}

		// Fallback standard text input for normal calendars
		return html` <input type="text" .value=${this._dialogSummary} @input=${(e: any) => (this._dialogSummary = e.target.value)} placeholder="Enter event title..." /> `;
	}

	private _getWeatherIcon(condition: string): string {
		const map: Record<string, string> = {
			"clear-night": "mdi:weather-night",
			cloudy: "mdi:weather-cloudy",
			exceptional: "mdi:alert-circle-outline",
			fog: "mdi:weather-fog",
			hail: "mdi:weather-hail",
			lightning: "mdi:weather-lightning",
			"lightning-rainy": "mdi:weather-lightning-rainy",
			partlycloudy: "mdi:weather-partly-cloudy",
			pouring: "mdi:weather-pouring",
			rainy: "mdi:weather-rainy",
			snowy: "mdi:weather-snowy",
			"snowy-rainy": "mdi:weather-snowy-rainy",
			sunny: "mdi:weather-sunny",
			windy: "mdi:weather-windy",
			"windy-variant": "mdi:weather-windy-variant",
		};
		return map[condition] || "mdi:weather-partly-cloudy";
	}

	private _formatTime(dateTimeStr: string): string {
		if (!dateTimeStr) return "";
		const date = new Date(dateTimeStr);
		// Formats as "3:00 PM" or "15:00" depending on your browser/HA locale settings
		return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
	}

	private _renderGrid() {
		const startOfMonth = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), 1);
		let currentDay = getStartOfWeek(startOfMonth);

		const palette = ["#F44336", "#E91E63", "#9C27B0", "#3F51B5", "#03A9F4", "#009688", "#FF9800", "#795548"];
		const days: any[] = [];

		// Force the date to strictly use your Home Assistant server's configured timezone
		const haTimeZone = this.hass?.config?.time_zone || Intl.DateTimeFormat().resolvedOptions().timeZone;

		const parts = new Intl.DateTimeFormat("en-US", {
			timeZone: haTimeZone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).formatToParts(new Date());

		const year = parts.find((p) => p.type === "year")?.value;
		const month = parts.find((p) => p.type === "month")?.value;
		const day = parts.find((p) => p.type === "day")?.value;

		const todayStr = `${year}-${month}-${day}`;

		for (let i = 0; i < 35; i++) {
			const dateStr = formatDate(currentDay);
			let dayEvents = this._events[dateStr] || [];

			// WEATHER LOGIC
			const dayForecasts = this._weatherForecast.filter((f) => f.datetime.includes(dateStr));
			let highTemp: number | null = null;
			let lowTemp: number | null = null;
			let mainCondition = "";
			if (dayForecasts.length > 0) {
				mainCondition = dayForecasts[0].condition;
				const temps = dayForecasts.map((f) => f.temperature);
				highTemp = Math.max(...temps);
				if (dayForecasts.length > 1) {
					lowTemp = Math.min(...temps);
				}
			}

			// Determine if this day is a weekend (0 = Sunday, 6 = Saturday)
			const isWeekend = currentDay.getDay() === 0 || currentDay.getDay() === 6;
			// Determine if this day is today
			const isToday = dateStr === todayStr;

			// EXTRACT WAKE EVENTS
			const wakeEvents = dayEvents.filter((ev) => ev.calendar_id.toLowerCase().includes("wake"));
			dayEvents = dayEvents.filter((ev) => !ev.calendar_id.toLowerCase().includes("wake"));

			// SORT REMAINING EVENTS
			dayEvents.sort((a, b) => {
				const aIsAllDay = a.start.date !== undefined;
				const bIsAllDay = b.start.date !== undefined;
				if (aIsAllDay && !bIsAllDay) return -1;
				if (!aIsAllDay && bIsAllDay) return 1;
				if (!aIsAllDay && !bIsAllDay) {
					const timeA = new Date(a.start.dateTime).getTime();
					const timeB = new Date(b.start.dateTime).getTime();
					if (timeA !== timeB) return timeA - timeB;
				}
				const aIndex = this.config.calendars.indexOf(a.calendar_id);
				const bIndex = this.config.calendars.indexOf(b.calendar_id);
				return aIndex - bIndex;
			});

			// BUILD THE HTML
			days.push(html`
				<div class="day-box ${isToday ? "today" : ""} ${isWeekend ? "weekend" : ""}">
					<div class="day-header">
						<div style="display:flex; align-items:center; gap: 8px;">
							<div class="date-badge">${currentDay.getDate()}</div>
							<div class="agenda-date-text">${currentDay.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" })}</div>
						</div>

						<div style="display:flex; align-items:center; gap: 4px; flex-wrap: wrap;">
							${highTemp !== null
								? html`
										<div class="weather-wrapper">
											<ha-icon icon=${this._getWeatherIcon(mainCondition)} style="--mdc-icon-size: 18px;"></ha-icon>
											<span> ${highTemp}°${lowTemp !== null ? html`<span style="opacity: 0.6; font-size: 0.9em;">/${lowTemp}°</span>` : ""} </span>
										</div>
									`
								: ""}
						</div>
					</div>

					<div style="display:flex; flex-direction:column; gap:2px;">
						${dayEvents.length === 0 ? html` <div class="empty-state">No events scheduled</div> ` : ""}
						${dayEvents.map((ev) => {
							const calIndex = this.config.calendars.indexOf(ev.calendar_id);
							const rawBgColor = this.config.colors?.[ev.calendar_id] || palette[calIndex % palette.length] || "#4caf50";
							const icon = this.hass.states[ev.calendar_id]?.attributes.icon || "mdi:calendar";

							const hideTime = ["food", "meals", "activities", "chores"].some((kw) => ev.calendar_id.toLowerCase().includes(kw));
							let displayTitle = ev.summary;

							if (!hideTime && ev.start.dateTime) {
								const timeString = this._formatTime(ev.start.dateTime);
								displayTitle = `${timeString} ${ev.summary}`;
							}

							return html`
								<div
									class="event-wrapper"
									@click=${(e: Event) => {
										e.stopPropagation();
										this._openEditDialog(ev, dateStr);
									}}>
									<ha-icon icon="${icon}" style="color: ${rawBgColor}; --mdc-icon-size: 18px; min-width: 18px;"></ha-icon>
									<div class="event-item" title="${displayTitle}" style="background-color: color-mix(in srgb, ${rawBgColor} 50%, transparent); color: var(--primary-text-color);">
										${displayTitle}
									</div>
								</div>
							`;
						})}
					</div>

					<div class="day-footer">
						<div style="display:flex; align-items:center; gap: 4px; flex-wrap: wrap;">
							${wakeEvents.map((ev) => {
								const calIndex = this.config.calendars.indexOf(ev.calendar_id);
								const rawBgColor = this.config.colors?.[ev.calendar_id] || palette[calIndex % palette.length] || "#4caf50";
								const icon = this.hass.states[ev.calendar_id]?.attributes.icon || "mdi:weather-sunset-up";
								const timeString = ev.start.dateTime ? this._formatTime(ev.start.dateTime) : "Wake";

								return html`
									<div
										class="wake-wrapper"
										@click=${(e: Event) => {
											e.stopPropagation();
											this._openEditDialog(ev, dateStr);
										}}>
										<ha-icon icon="${icon}" style="color: ${rawBgColor}; --mdc-icon-size: 16px;"></ha-icon>
										<div class="wake-badge" title="${ev.summary}">${timeString}</div>
									</div>
								`;
							})}
						</div>

						<ha-icon
							class="clickable-icon add-event-btn"
							icon="mdi:plus"
							style="--mdc-icon-size: 20px; margin: 0; padding: 4px;"
							@click=${() => this._openDialog(dateStr)}></ha-icon>
					</div>
				</div>
			`);
			currentDay.setDate(currentDay.getDate() + 1);
		}
		return days;
	}
}
