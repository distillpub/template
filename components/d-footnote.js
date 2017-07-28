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

const TemplatedFootnote = Template("d-footnote", templateString);

export class Footnote extends TemplatedFootnote(HTMLElement) {

  connectedCallback() {
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

    // register with footnote list should there be one
    const footnoteList = document.querySelector('d-footnote-list');
    if (footnoteList) {
      customElements.whenDefined('d-footnote-list').then(() => {
        footnoteList.registerFootnote(this);
      });
    }
  }

}

Footnote.currentFootnoteId = 0;

customElements.define("d-footnote", Footnote);
