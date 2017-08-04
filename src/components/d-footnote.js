import { Template } from "../mixins/template.js";
import { HoverBox } from "../helpers/hover-box";
// import { Store } from './store';

const T = Template("d-footnote", `
<style>

d-math[block] {
  display: block;
}

</style>

<div style="display: none;" class="dt-hover-box">
  <slot id='slot'></slot>
</div>

<sup><span id="fn-" data-hover-ref="" style="cursor:pointer"></span></sup>

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
    // slot.addEventListener('slotchange', this.notify);

    // create numeric ID
    Footnote.currentFootnoteId += 1;
    const IdString = Footnote.currentFootnoteId.toString();
    this.root.host.id = 'd-footnote-' + IdString;

    // set up hidden hover box
    const div = this.root.querySelector('.dt-hover-box');
    div.id = 'dt-fn-hover-box-' + IdString;

    // set up visible footnote marker
    const span = this.root.querySelector('#fn-');
    span.setAttribute('id', 'fn-' + IdString);
    span.setAttribute('data-hover-ref', div.id);
    span.textContent = IdString;

    HoverBox.get_box(div).bind(span);
  }

}

Footnote.currentFootnoteId = 0;
