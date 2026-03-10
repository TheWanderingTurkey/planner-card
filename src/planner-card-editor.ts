import { LitElement, html, css } from 'lit';
import { state, property } from 'lit/decorators.js';

export class PlannerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config: any;
  
  // NEW: State variables for the Add Calendar UI
  @state() private _showAddCalendar = false;
  @state() private _selectedNewCalendar = '';

  public setConfig(config: any) {
    this._config = config;
  }

  private _configChanged(newConfig: any) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true,
    });
    (event as any).detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  private _weatherChanged(ev: any) {
    if (!this._config || !this.hass) return;
    this._configChanged({ ...this._config, weather_entity: ev.detail.value });
  }

  // --- NEW ADD CALENDAR LOGIC ---

  private _newCalendarPicked(ev: any) {
    // Just save the selection in state, don't add to config yet
    this._selectedNewCalendar = ev.detail.value;
  }

  private _confirmAddCalendar() {
    if (!this._selectedNewCalendar) return;
    
    const newCal = this._selectedNewCalendar;
    const calendars = [...(this._config.calendars || [])];
    
    if (!calendars.includes(newCal)) {
      calendars.push(newCal);
      this._configChanged({ ...this._config, calendars });
    }
    
    // Reset state and close the box
    this._selectedNewCalendar = '';
    this._showAddCalendar = false;
  }

  private _cancelAddCalendar() {
    // Reset state and close the box without saving
    this._selectedNewCalendar = '';
    this._showAddCalendar = false;
  }

  // --- END NEW LOGIC ---

  private _removeCalendar(index: number) {
    const calendars = [...this._config.calendars];
    calendars.splice(index, 1);
    this._configChanged({ ...this._config, calendars });
  }

  private _moveCalendar(index: number, direction: number) {
    const calendars = [...this._config.calendars];
    if (index + direction < 0 || index + direction >= calendars.length) return;
    
    const temp = calendars[index];
    calendars[index] = calendars[index + direction];
    calendars[index + direction] = temp;
    
    this._configChanged({ ...this._config, calendars });
  }

  private _updateColor(cal: string, color: string) {
    const colors = { ...(this._config.colors || {}) };
    colors[cal] = color;
    this._configChanged({ ...this._config, colors });
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const calendars = this._config.calendars || [];

    return html`
      <div class="card-config">
        
        <div class="section">
          <h3>Weather Entity</h3>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: 'weather' } }}
            .value=${this._config.weather_entity}
            @value-changed=${this._weatherChanged}
          ></ha-selector>
        </div>

        <div class="section">
          <h3>Calendars & Colors</h3>
          
          ${this._showAddCalendar ? html`
            <div class="add-calendar-box">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: { domain: 'calendar' } }}
                .value=${this._selectedNewCalendar}
                @value-changed=${this._newCalendarPicked}
              ></ha-selector>
              <div class="add-actions">
                <button class="btn cancel" @click=${this._cancelAddCalendar}>Cancel</button>
                <button class="btn add" ?disabled=${!this._selectedNewCalendar} @click=${this._confirmAddCalendar}>Add</button>
              </div>
            </div>
          ` : html`
            <button class="btn add-new" @click=${() => this._showAddCalendar = true}>
              <ha-icon icon="mdi:plus" style="--mdc-icon-size: 20px;"></ha-icon> Add Calendar
            </button>
          `}

          <div class="calendar-list">
            ${calendars.map((cal: string, index: number) => {
              const friendlyName = this.hass.states[cal]?.attributes.friendly_name || cal;
              const currentColor = this._config.colors?.[cal] || '#4caf50';

              return html`
                <div class="calendar-item">
                  <input 
                    type="color" 
                    title="Choose Color"
                    .value=${currentColor} 
                    @input=${(e: any) => this._updateColor(cal, e.target.value)} 
                  />
                  
                  <div class="name" title="${cal}">${friendlyName}</div>
                  
                  <div class="controls">
                    <ha-icon 
                      class="icon-btn" 
                      icon="mdi:arrow-up" 
                      @click=${() => this._moveCalendar(index, -1)}
                      style="visibility: ${index === 0 ? 'hidden' : 'visible'}">
                    </ha-icon>
                    
                    <ha-icon 
                      class="icon-btn" 
                      icon="mdi:arrow-down" 
                      @click=${() => this._moveCalendar(index, 1)}
                      style="visibility: ${index === calendars.length - 1 ? 'hidden' : 'visible'}">
                    </ha-icon>
                    
                    <ha-icon 
                      class="icon-btn delete" 
                      icon="mdi:delete" 
                      @click=${() => this._removeCalendar(index)}>
                    </ha-icon>
                  </div>
                </div>
              `;
            })}
          </div>
        </div>

      </div>
    `;
  }

  static styles = css`
    .card-config { display: flex; flex-direction: column; gap: 24px; }
    .section h3 { margin: 0 0 8px 0; font-size: 1.1em; color: var(--primary-text-color); }
    
    /* --- NEW BUTTON & ADD BOX STYLES --- */
    .btn {
      background: var(--primary-color);
      color: var(--text-primary-color);
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn.cancel { background: transparent; color: var(--primary-text-color); border: 1px solid var(--divider-color); }
    .btn.add-new { 
      background: transparent; 
      color: var(--primary-color); 
      border: 1px solid var(--primary-color); 
      width: 100%; 
      justify-content: center; 
      margin-bottom: 8px;
    }
    .add-calendar-box {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 12px;
      background: var(--secondary-background-color);
    }
    .add-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
    /* ----------------------------------- */

    .calendar-list { display: flex; flex-direction: column; gap: 8px; }
    .calendar-item {
      display: flex; align-items: center; gap: 12px;
      background: var(--secondary-background-color);
      padding: 8px 12px; border-radius: 8px;
      border: 1px solid var(--divider-color);
    }
    input[type="color"] { border: none; width: 28px; height: 28px; padding: 0; border-radius: 4px; cursor: pointer; background: transparent; }
    input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
    input[type="color"]::-webkit-color-swatch { border: 1px solid rgba(0,0,0,0.2); border-radius: 4px; }
    .name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; color: var(--primary-text-color); }
    .controls { display: flex; gap: 4px; }
    .icon-btn { cursor: pointer; color: var(--secondary-text-color); padding: 4px; border-radius: 4px; transition: background 0.2s, color 0.2s; }
    .icon-btn:hover { background: rgba(128, 128, 128, 0.1); color: var(--primary-text-color); }
    .icon-btn.delete:hover { color: #ff5252; background: rgba(255, 82, 82, 0.1); }
  `;
}

customElements.define('meal-activity-planner-editor', PlannerCardEditor);