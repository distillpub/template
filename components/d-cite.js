import { Template } from "../mixins/template";
import { hover_cite } from "./citation";
import { HoverBox } from "./hover-box";

const T = Template('d-cite', `
<style>
  .citation {
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
</style>

<div style="display: none;" class="dt-hover-box">
</div>

<span id="citation-" class="citation">
  <slot></slot>
  <span class="citation-number"></span>
</span>
`);


function inline_cite_short(keys, bibliography) {
  function cite_string(key) {
    if (bibliography.hasEntry(key)){
      return (bibliography.getIndex(key)+1).toString();
    } else {
      return "?";
    }
  }
  return "[" + keys.map(cite_string).join(", ") + "]";
}


export default class Cite extends T(HTMLElement) {

  constructor() {
    super()
    this._key = null;

    Cite.currentId += 1;
    this.citeId = Cite.currentId;
  }

  static get observedAttributes() {
    return ['key'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // name will always be "key" due to observedAttributes
    this._key = newValue;
    this.renderContent();
  }

  get key() {
    return this._key;
  }

  set key(value) {
    this.setAttribute('key', value);
  }

  renderContent() {
    const bibliography = document.querySelector('d-bibliography');
    if (bibliography && bibliography.finishedLoading) {
      customElements.whenDefined('d-bibliography').then( () => {
        const keys = this.key.split(",");

        // set up hidden hover box
        const div = this.root.querySelector('.dt-hover-box');
        div.innerHTML = keys.map( (key) => {
          return bibliography.getEntry(key);
        }).map(hover_cite).join('<br><br>');
        div.id ='dt-cite-hover-box-' + this.citeId;

        // set up visible citation marker
        const outerSpan = this.root.querySelector('#citation-');
        outerSpan.id = `citation-${this.citeId}`;
        // outerSpan.setAttribute('data-hover', dataHoverString); // directly tell HoverBox instead?
        const innerSpan = this.root.querySelector('.citation-number');
        innerSpan.textContent = inline_cite_short(keys, bibliography);

        HoverBox.get_box(div).bind(outerSpan);
      });
    } else {
      console.error(`You used a d-cite tag (${key}) without including a d-bibliography tag in your article. We can't lookup your citation this way.`)
    }
  }

}

Cite.currentId = 0;

customElements.define(Cite.is, Cite);
