import { parseBibtex } from '../helpers/bibtex';

export function parseBibliography(element) {
  const scriptTag = element.firstElementChild;
  if (scriptTag && scriptTag.tagName === 'SCRIPT') {
    if (scriptTag.type == 'text/bibtex') {
      const bibtex = element.firstElementChild.textContent;
      return parseBibtex(bibtex);
    } else if (scriptTag.type == 'text/json') {
      return new Map(JSON.parse(scriptTag.textContent));
    } else {
      console.warn('Unsupported bibliography script tag type: ' + scriptTag.type);
    }
  } else {
    console.warn('Bibliography did not have any script tag.');
  }
}

export class Bibliography extends HTMLElement {

  static get is() { return 'd-bibliography'; }

  constructor() {
    super();

    // set up mutation observer
    const options = {childList: true, characterData: true, subtree: true};
    const observer = new MutationObserver( (entries) => {
      for (const entry of entries) {
        if (entry.target.nodeName === 'SCRIPT' || entry.type === 'characterData') {
          this.parseIfPossible();
        }
      }
    });
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
