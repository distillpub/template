import { Template } from "../mixins/template.js"
import { HoverBox } from "./hover-box.js"

const templateString = `
<style>

d-math[block] {
  display: block;
}

</style>

<div style="display: none;" class="dt-hover-box">
  <slot></slot>
</div>

<sup><span id="fn-" data-hover-ref="" style="cursor:pointer"></span></sup>

`;

const TemplatedFootnote = Template("d-math", templateString);

export class Footnote extends TemplatedFootnote(HTMLElement) {

  constructor() {
    super();

    Footnote.currentFootnoteId += 1;
    const IdString = Footnote.currentFootnoteId.toString();
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

customElements.define("d-footnote", Footnote);
