/**
 * Copyright 2026 dsimkanin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 30;
  }

  static get properties() {
    return {
      ...super.properties,
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true }
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: var(--ddd-theme-default-slateLight);
          font-family: var(--ddd-font-primary);
          border: var(--ddd-border-md);
          padding: var(--ddd-spacing-4);
          text-align: center;
        }

        .number {
          font-size: var(--ddd-font-size-4xl);
          margin-bottom: var(--ddd-spacing-3);
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: var(--ddd-spacing-2);
        }

        button {
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          font-size: var(--ddd-font-size-m);
          border-radius: var(--ddd-radius-sm);
          border: none;
          background-color: var(--ddd-theme-default-beaverBlue);
          color: white;
        }

        button:hover,
        button:focus {
          background-color: var(--ddd-theme-default-wonderPurple);
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* color when specific values hit */
        :host([counter="18"]) .number {
          color: var(--ddd-theme-default-coalyGray);
        }

        :host([counter="21"]) .number {
          color: var(--ddd-theme-default-original87Pink);
        }

        /* min/max states via class */
        .number.at-min {
          color: var(--ddd-theme-default-warning);
        }

        .number.at-max {
          color: var(--ddd-theme-default-error);
        }
      `
    ];
  }

  render() {
    return html`
      <div class="number ${this._statusClass()}">
        ${this.counter}
      </div>

      <div class="buttons">
        <button 
          @click="${this.decrement}"
          ?disabled="${this.counter <= this.min}">
          -
        </button>

        <button 
          @click="${this.increment}"
          ?disabled="${this.counter >= this.max}">
          +
        </button>
      </div>
    `;
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  _statusClass() {
    if (this.counter === this.min) return "at-min";
    if (this.counter === this.max) return "at-max";
    return "";
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);