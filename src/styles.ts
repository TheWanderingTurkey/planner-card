import { css } from "lit";

export const plannerStyles=css`
	:host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

	ha-card {
		padding: 16px;
	}

	.empty-state {
		opacity: 0.5;
		font-style: italic;
		font-size: 0.9em;
		padding: 8px 4px;
		text-align: center;
	}

	.header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		gap: 12px;
	}

	/* Keeps the month and the view toggles on the same row */
	.header-left {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.month-nav {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	/* Reduce the padding on the arrows so they hug the text tighter */
	.month-nav .clickable-icon {
		padding: 4px;
	}

	/* Removed min-width, added a tiny margin to let it breathe naturally */
	.month-nav h2 {
		margin: 0 4px;
		font-size: 1.5rem;
		text-align: center;
		white-space: nowrap;
	}

	.toggles {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		flex: 1;
		justify-content: flex-end;
	}

	.grid {
    display: grid;
    /* Use minmax(0, 1fr) to force perfectly equal columns regardless of content width */
    grid-template-columns: repeat(7, minmax(0, 1fr)); 
    gap: 4px;
    background: var(--divider-color, #e0e0e0);
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    overflow: hidden;
  }

	.day-box {
		background-color: var(--card-background-color, #fff);
		padding: 6px;
		/* Increased padding */
		display: flex;
		flex-direction: column;
		gap: 4px;
		/* More space between events */
		position: relative;
		min-height: 110px;
	}

	/* =========================================
			DAY MODIFIERS (Today & Weekends)
			========================================= */

	/* Highlight today with the theme's primary color */
	.day-box.today {
		box-shadow: inset 0 0 0 2px var(--primary-color);
	}

	/* Make today's date badge pop */
	.day-box.today .date-badge {
		background-color: var(--primary-color);
		color: var(--text-primary-color, #ffffff);
	}

	/* Weekends get a subtle background shift (HA handles light/dark automatically) */
	.day-box.weekend {
		background-color: var(--secondary-background-color, rgba(128, 128, 128, 0.05));
	}

	.day-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.1em;
		font-weight: bold;
		margin-bottom: 6px;
	}

	/* NEW: Sticky footer for weather and add button */
	.day-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
		padding-top: 6px;
		min-height: 24px;
	}

	.weather-wrapper {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 1em;
		/* Larger weather text */
		opacity: 0.8;
	}

	.add-event-btn {
		cursor: pointer;
		opacity: 0.2;
		transition: opacity 0.2s;
	}

	.day-box:hover .add-event-btn {
		opacity: 1;
	}

	/* New wrapper to align the icon and the event box */
	.event-wrapper {
		display: flex;
		align-items: center;
		gap: 6px;
		/* Space between icon and box */
		width: 100%;
		cursor: pointer;
	}

	/* Wake badge specific styling */
	.wake-wrapper {
		display: flex;
		align-items: center;
		gap: 4px;
		cursor: pointer;
	}

	.wake-badge {
		font-size: 0.9em;
		font-weight: 600;
		white-space: nowrap;
		color: #ffffff;
		/* Forced white text */
		background: transparent;
		/* No background */
	}

	.clickable-icon {
		cursor: pointer;
		padding: 8px;
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.clickable-icon:hover {
		opacity: 1;
	}

	/* Dialog Styling */
	dialog {
		border: none;
		border-radius: 8px;
		padding: 20px;
		background: var(--card-background-color);
		color: var(--primary-text-color);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		width: 320px;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	.dialog-row {
		margin-bottom: 12px;
		display: flex;
		flex-direction: column;
	}

	.dialog-row label {
		font-size: 1em;
		font-weight: bold;
	}

	.dialog-row select,
	.dialog-row input {
		padding: 8px;
		margin-top: 4px;
		font-size: 1em;
	}

	/* Larger inputs */
	button {
		padding: 8px 12px;
		font-size: 1em;
		cursor: pointer;
	}

	ha-chip {
		cursor: pointer !important;
		transition:
			opacity 0.2s ease,
			filter 0.2s ease;
	}

	ha-chip:hover {
		filter: brightness(1.3);
	}

	ha-chip[outline] {
		opacity: 0.4;
		filter: grayscale(1);
	}

	ha-chip ha-icon {
		--mdc-icon-size: 18px;
	}

	/* NEW: Dark gray circle for the date */
	.date-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background-color: #444444;
		/* Dark gray */
		color: #ffffff;
		/* White text for contrast */
		border-radius: 50%;
		font-size: 1.2em;
		/* Larger font */
		font-weight: bold;
	}

	/* UPDATED: Event item with smaller text and tighter padding */
	.event-item {
		flex: 1;
		min-width: 0;
		border-radius: 8px;
		padding: 3px 6px;
		/* Reduced vertical padding slightly */
		font-size: 0.85em;
		/* Reduced font size by approx 1pt */
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		box-sizing: border-box;
	}

	/* --- VIEW TOGGLE BUTTONS --- */
	.view-toggles {
		display: flex;
		background: var(--secondary-background-color);
		border-radius: 8px;
		padding: 2px;
	}

	.view-toggles ha-icon {
		padding: 6px;
		border-radius: 6px;
		opacity: 0.4;
		cursor: pointer;
		transition: all 0.2s;
	}

	.view-toggles ha-icon:hover {
		opacity: 0.8;
	}

	.view-toggles ha-icon.active {
		opacity: 1;
		background: var(--card-background-color);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.agenda-date-text {
		display: none;
		font-size: 1.1em;
		font-weight: bold;
	}

	/* =========================================
			LAYOUT: SQUEEZED (iPad Portrait)
			Compresses the grid to fit narrow screens
			========================================= */
	.layout-squeezed .date-badge {
		width: 22px;
		height: 22px;
		font-size: 0.9em;
	}

	.layout-squeezed .day-box {
		padding: 4px;
	}

	.layout-squeezed .event-item {
		font-size: 0.7em;
		padding: 2px;
	}

	.layout-squeezed .weather-wrapper span {
		font-size: 0.8em;
	}

	.layout-squeezed ha-icon {
		--mdc-icon-size: 14px !important;
		min-width: 14px;
	}

	/* =========================================
			LAYOUT: AGENDA (iPhone Portrait)
			Destroys the grid, creates a vertical list
			========================================= */
	.layout-agenda .grid {
		display: flex;
		flex-direction: column;
		gap: 12px;
		background: transparent;
		border: none;
		max-height: 65vh;
		/* Locks the height so it scrolls internally */
		overflow-y: auto;
		/* Enables vertical scrolling */
		padding-right: 8px;
		/* Adds a little breathing room for the scrollbar */
	}

	/* Style the scrollbar to match the slick HA interface */
	.layout-agenda .grid::-webkit-scrollbar {
		width: 6px;
	}

	.layout-agenda .grid::-webkit-scrollbar-thumb {
		background: var(--divider-color);
		border-radius: 3px;
	}

	.layout-agenda .day-box {
		border: 1px solid var(--divider-color);
		border-radius: 12px;
		padding: 16px;
		min-height: unset;
		/* Strip away the 110px minimum from the desktop grid */
		height: fit-content;
		/* Hug the content tightly */
	}

	/* Keep your existing .layout-agenda rules below this... */
	.layout-agenda .agenda-date-text {
		display: block;
	}

	.layout-agenda .day-header {
		border-bottom: 1px solid var(--divider-color);
		padding-bottom: 12px;
		margin-bottom: 12px;
	}

	.layout-agenda .event-item {
		font-size: 1.05em;
		padding: 8px 12px;
	}

	.layout-agenda .event-wrapper {
		margin-bottom: 6px;
	}

	.layout-agenda .day-footer {
		margin-top: 16px;
	}

	/* Agenda Overrides for the Header */
	.layout-agenda .header {
		flex-direction: column;
		/* Forces the two sections to stack vertically */
		align-items: flex-start;
		gap: 12px;
	}

	.layout-agenda .header-left {
		width: 100%;
		gap: 4px;
	}

	.layout-agenda .month-nav h2 {
		font-size: 1.25rem;
	}

	.layout-agenda .view-toggles ha-icon {
		padding: 4px;
		--mdc-icon-size: 20px;
	}

	.layout-agenda .toggles {
		width: 100%;
		/* Ensures the chips take up the full width of the new row */
		justify-content: flex-start;
	}
`;