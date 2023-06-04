import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('story-card')
export class StoryCard extends LitElement {
  @query('slot[name="media"]')
  private _mediaSlot!: HTMLSlotElement;

  private get _slottedMedia(): HTMLMediaElement | null {
    const el = this._mediaSlot && this._mediaSlot.assignedNodes()[0];
    return el instanceof HTMLMediaElement ? el : null;
  }

  constructor() {
    super();
    this.addEventListener('entered', () => {
      if (this._slottedMedia) {
        this._slottedMedia.currentTime = 0;
        this._slottedMedia.play();
      }
    });

    this.addEventListener('exited', () => {
      if (this._slottedMedia) {
        this._slottedMedia.pause();
      }
    });
  }

  render() {
    return html`
      <div id="media">
        <slot name="media"></slot>
      </div>
      <div id="content">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    #media {
      height: 100%;
    }
    #media ::slotted(*) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Default styles for content */
    #content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 48px;
      font-family: sans-serif;
      color: white;
      font-size: 24px;
    }
    #content > slot::slotted(*) {
      margin: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'story-card': StoryCard;
  }
}
