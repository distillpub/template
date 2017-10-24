import { Template } from '../mixins/template.js';

const T = Template('d-footnote', `
<style>

d-math[block] {
  display: block;
}

:host {
}

sup {
  line-height: 1em;
  font-size: 0.75em;
  position: relative;
  top: -.5em;
  vertical-align: baseline;
}

span {
  color: hsla(206, 90%, 20%, 0.7);
  cursor: default;
}

.container {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 10000;
}

.dt-hover-box {
  margin: 0 auto;
  width: 704px;
  max-width: 100vw;
  background-color: #FFF;
  opacity: 0.95;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 8px 16px;
  border-radius: 3px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

</style>

<d-hover-box>
  <slot id="slot"></slot>
</d-hover-box>

<sup>
  <span id="fn-" data-hover-ref=""></span>
</sup>

`);

export class Footnote extends T(HTMLElement) {

  constructor() {
    super();

    const options = {childList: true, characterData: true, subtree: true};
    const observer = new MutationObserver(this.notify);
    observer.observe(this, options);
  }

  notify() {
    const options = { detail: this, bubbles: true };
    const event = new CustomEvent('onFootnoteChanged', options);
    document.dispatchEvent(event);
  }

  connectedCallback() {
    // listen and notify about changes to slotted content
    // const slot = this.shadowRoot.querySelector('#slot');
    // console.warn(slot.textContent);
    // slot.addEventListener('slotchange', this.notify);
    this.hoverBox = this.root.querySelector('d-hover-box');
    window.customElements.whenDefined('d-hover-box').then(() => {
      this.hoverBox.listen(this);
    });
    // create numeric ID
    Footnote.currentFootnoteId += 1;
    const IdString = Footnote.currentFootnoteId.toString();
    this.root.host.id = 'd-footnote-' + IdString;

    // set up hidden hover box
    const id = 'dt-fn-hover-box-' + IdString;
    this.hoverBox.id = id

    // set up visible footnote marker
    const span = this.root.querySelector('#fn-');
    span.setAttribute('id', 'fn-' + IdString);
    span.setAttribute('data-hover-ref', id);
    span.textContent = IdString;
  }

}

Footnote.currentFootnoteId = 0;
