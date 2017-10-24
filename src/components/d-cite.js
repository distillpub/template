import { Template } from '../mixins/template';
import { hover_cite, bibliography_cite } from '../helpers/citation';

const T = Template('d-cite', `
<style>

:host {
  display: inline-block;
}

.citation {
  display: inline-block;
  color: hsla(206, 90%, 20%, 0.7);
}

.citation-number {
  cursor: default;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
  font-size: 75%;
  color: hsla(206, 90%, 20%, 0.7);
  display: inline-block;
  line-height: 1.1em;
  text-align: center;
  position: relative;
  top: -2px;
  margin: 0 2px;
}

figcaption .citation-number {
  font-size: 11px;
  font-weight: normal;
  top: -2px;
  line-height: 1em;
}

d-hover-box {
  margin-top: 1.9em;
}

</style>

<d-hover-box id="hover-box"></d-hover-box>

<div id="citation-" class="citation"><slot></slot><span class="citation-number"></span></div>
`);

export class Cite extends T(HTMLElement) {

  /* Lifecycle */

  // constructor() {
  //   super();
  //   // Cite.currentId += 1;
  //   // this.citeId = Cite.currentId;
  // }

  connectedCallback() {
    this.outerSpan = this.root.querySelector('#citation-');
    this.innerSpan = this.root.querySelector('.citation-number');
    this.hoverBox = this.root.querySelector('d-hover-box');
    window.customElements.whenDefined('d-hover-box').then(() => {
      this.hoverBox.listen(this);
    });
  }

  //TODO This causes an infinite loop on firefox with polyfills.
  // This is only needed for interactive editing so no priority.
  // disconnectedCallback() {
    // const options = { detail: [this, this.keys], bubbles: true };
    // const event = new CustomEvent('onCiteKeyRemoved', options);
    // document.dispatchEvent(event);
  // }

  /* observe 'key' attribute */

  static get observedAttributes() {
    return ['key'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const eventName = oldValue ? 'onCiteKeyChanged' : 'onCiteKeyCreated';
    const keys = newValue.split(',');
    const options = { detail: [this, keys], bubbles: true };
    const event = new CustomEvent(eventName, options);
    document.dispatchEvent(event);
  }

  set key(value) {
    this.setAttribute('key', value);
  }

  get key() {
    return this.getAttribute('key');
  }

  get keys() {
    return this.getAttribute('key').split(',');
  }

  /* Setters & Rendering */

  set numbers(numbers) {
    const numberStrings = numbers.map( index => {
      return index == -1 ? '?' : index + 1 + '';
    });
    const textContent = '[' + numberStrings.join(', ') + ']';
    this.innerSpan.textContent = textContent;
  }

  set entries(entries) {
    this.hoverBox.innerHTML = entries.map(hover_cite).join('<br><br>');
  }

}
