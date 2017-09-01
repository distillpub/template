import { Template } from '../mixins/template';
import { parseBibtex } from '../helpers/bibtex';
import { bibliography_cite } from '../helpers/citation';

export const templateString = `
<style>
  :host {
    contain: content;
  }
  .references {
    font-size: 12px;
    line-height: 20px;
  }
  .title {
    font-weight: 600;
  }
  ol {
    padding: 0 0 0 18px;
  }
  li {
    margin-bottom: 12px;
  }
  h3 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 0;
    color: rgba(0,0,0,0.65);
    line-height: 1em;
  }
  a {
    color: rgba(0, 0, 0, 0.6);
  }
</style>

<h3>References</h3>
<ol class='references' id='references-list' ></ol>
`;

export function parseBibliography(element) {
  if (element.firstElementChild && element.firstElementChild.tagName === 'SCRIPT') {
    const bibtex = element.firstElementChild.textContent;
    return parseBibtex(bibtex);
  }
}

export function renderBibliography(element, entries) {
  if (entries.size) {
    element.host.style.display = 'initial';
    let list = element.querySelector('#references-list');
    list.innerHTML = '';

    for (const [key, entry] of entries) {
      const listItem = document.createElement('li');
      listItem.id = key;
      listItem.innerHTML = bibliography_cite(entry);
      list.appendChild(listItem);
    }
  } else {
    element.host.style.display = 'none';
  }
}

const T = Template('d-bibliography', templateString);
export class Bibliography extends T(HTMLElement) {

  constructor() {
    super();

    // set up mutation observer
    const options = {childList: true, characterData: true, subtree: true};
    const observer = new MutationObserver( () => {
      observer.disconnect();
      this.parseIfPossible();
      observer.observe(this, options);
    });
    this.parseIfPossible();
    // ...and listen for changes
    observer.observe(this, options);
  }

  parseIfPossible() {
    const scriptTag = this.querySelector('script');
    if (!scriptTag) return;
    if (scriptTag.type == 'text/bibtex') {
      const newBibtex = scriptTag.textContent;
      if (this.bibtex !== newBibtex) {
        this.bibtex = newBibtex;
        const bibliography = parseBibtex(this.bibtex);
        this.notify(bibliography);
      }
    } else if (scriptTag.type == 'text/json') {
      const bibliography = new Map(JSON.parse(scriptTag.textContent));
      this.notify(bibliography);
    } else {
      console.warn('Unsupported bibliography script tag type: ' + scriptTag.type);
    }
  }

  notify(bibliography) {
    const options = { detail: bibliography, bubbles: true };
    const event = new CustomEvent('onBibliographyChanged', options);
    this.dispatchEvent(event);
  }

  set entries(newEntries) {
    renderBibliography(this.root, newEntries);
  }

  /* observe 'src' attribute */

  static get observedAttributes() {
    return ['src'];
  }

  receivedBibtex(event) {
    const bibliography = parseBibtex(event.target.response);
    this.notify(bibliography);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    var oReq = new XMLHttpRequest();
    oReq.onload = (e) => this.receivedBibtex(e);
    oReq.onerror = () => console.warn(`Could not load Bibtex! (tried ${newValue})`);
    oReq.responseType = 'text';
    oReq.open('GET', newValue, true);
    oReq.send();
  }


}
