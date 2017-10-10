import { Template } from '../mixins/template';
import { hover_cite, bibliography_cite } from '../helpers/citation';
import { HoverBox } from '../helpers/hover-box';

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

.container {
  position: fixed;
  width: 100%;
  left: 0;
  z-index: 10000;
}

.dt-hover-box {
  margin: 0 auto;
  width: 400px;
  max-width: 700px;
  background-color: #FFF;
  opacity: 0.95;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 8px 16px;
  border-radius: 3px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);
}

</style>

<div class="container">
  <div id="hover-box" class="dt-hover-box"></div>
</div>

<span id="citation-" class="citation">
  <slot></slot>
  <span class="citation-number"></span>
</span>
`);

export class Cite extends T(HTMLElement) {

  /* Lifecycle */

  // constructor() {
  //   super();
  //   // Cite.currentId += 1;
  //   // this.citeId = Cite.currentId;
  // }

  connectedCallback() {
    // this.notify();

    this.hoverDiv = this.root.querySelector('.dt-hover-box');
    this.outerSpan = this.root.querySelector('#citation-');
    this.innerSpan = this.root.querySelector('.citation-number');
    // this.outerSpan.id = `citation-${this.citeId}`;
    // this.hoverDiv.id = `dt-cite-hover-box-${this.citeId}`;
    // console.log(this, this.hoverDiv, this.outerSpan, this.innerSpan);
    this.hoverbox = new HoverBox(this.hoverDiv, this.outerSpan);
  }

  disconnectedCallback() {
    const options = { detail: [this, this.keys], bubbles: true };
    const event = new CustomEvent('onCiteKeyRemoved', options);
    document.dispatchEvent(event);
  }

  /* Observed Attributes */

  // renderCitationNumbers(citations) {
  //   const numbers = this._keys.map( (key) => {
  //     const index = citations.indexOf(key);
  //     return index == -1 ? '?' : index + 1 + '';
  //   });
  //   const text = "[" + numbers.join(", ") + "]";
  //   this.innerSpan.textContent = text;
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
    const innerSpan = this.root.querySelector('.citation-number');
    innerSpan.textContent = textContent;
  }

  set entries(entries) {
    const div = this.root.querySelector('#hover-box');
    div.innerHTML = entries.map(hover_cite).join('<br><br>');
  }

  // renderContent() {
  //   const bibliography = document.querySelector('d-bibliography');
  //   if (bibliography && bibliography.finishedLoading) {
  //     customElements.whenDefined('d-bibliography').then( () => {
  //       const keys = this.key.split(",");
  //
  //       // set up hidden hover box
  //       const div = this.root.querySelector('.dt-hover-box');
  //       div.innerHTML = keys.map( (key) => {
  //         return bibliography.getEntry(key);
  //       }).map(hover_cite).join('<br><br>');
  //       div.id ='dt-cite-hover-box-' + this.citeId;
  //
  //       // set up visible citation marker
  //       const outerSpan = this.root.querySelector('#citation-');
  //       outerSpan.id = `citation-${this.citeId}`;
  //       // outerSpan.setAttribute('data-hover', dataHoverString); // directly tell HoverBox instead?
  //       const innerSpan = this.root.querySelector('.citation-number');
  //       innerSpan.textContent = inline_cite_short(keys, bibliography);
  //
  //       HoverBox.get_box(div).bind(outerSpan);
  //     });
  //   } else {
  //     console.error(`You used a d-cite tag (${key}) without including a d-bibliography tag in your article. We can't lookup your citation this way.`)
  //   }
  // }

}
