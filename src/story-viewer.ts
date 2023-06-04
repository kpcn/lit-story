import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('story-viewer')
export class StoryViewer extends LitElement {
  @property({ type: Number }) index: number = 0;

  update(changeProperties: PropertyValues) {
    super.update(changeProperties);
    const width = this.clientWidth;
    Array.from(this.children).forEach((el: Element, index) => {
      const x = (index - this.index) * width;
      (el as HTMLElement).style.transform = `translate3d(${x}px,0,0)`;
    });
  }

  _next() {
    this.index = Math.max(
      0,
      Math.min(this.children.length - 1, this.index + 1)
    );
  }

  _previous() {
    this.index = Math.max(
      0,
      Math.min(this.children.length - 1, this.index - 1)
    );
  }

  render() {
    return html`
      <slot></slot>
      <svg id="prev" viewBox="0 0 10 10" @click=${() => this._previous()}>
        <path d="M 6 2 L 4 5 L 6 8" stroke="#fff" fill="none" />
      </svg>
      <svg id="next" viewBox="0 0 10 10" @click=${() => this._next()}>
        <path d="M 4 2 L 6 5 L 4 8" stroke="#fff" fill="none" />
      </svg>
      <div id="progress">
        ${Array.from(this.children).map(
          (_, i) => html`
            <div
              class=${classMap({ watched: i <= this.index })}
              @click=${() => (this.index = i)}></div>
          `
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 400px;
      height: 800px;
    }
    ::slotted(*) {
      position: absolute;
      width: 100%;
      height: calc(100% - 20px);
    }

    svg {
      position: absolute;
      top: calc(50% - 25px);
      height: 50px;
      cursor: pointer;
    }
    #next {
      right: 0;
    }

    #progress {
      position: relative;
      top: calc(100% - 20px);
      height: 20px;
      width: 50%;
      margin: 0 auto;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      grid-gap: 10px;
      align-content: center;
    }
    #progress > div {
      background: grey;
      height: 4px;
      transition: background 0.3s linear;
      cursor: pointer;
    }
    #progress > div.watched {
      background: yellow;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'story-viewer': StoryViewer;
  }
}
