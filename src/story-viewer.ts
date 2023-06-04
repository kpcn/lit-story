import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('story-viewer')
export class StoryViewer extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 300px;
      height: 800px;
    }
    ::slotted(*) {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'story-viewer': StoryViewer;
  }
}
