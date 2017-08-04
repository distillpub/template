import { Template } from '../mixins/template';
import bibtexParse from 'bibtex-parse-js';
import { bibliography_cite } from '../helpers/citation';

const T = Template('d-bibliography', `
<style>
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
<ol></ol>
`);

export function parseBibtex(bibtex) {
  const bibliography = new Map();
  const parsedEntries = bibtexParse.toJSON(bibtex);
  for (const entry of parsedEntries) {
    // normalize tags; note entryTags is an object, not Map
    for (const tag in entry.entryTags) {
      let value = entry.entryTags[tag];
      value = value.replace(/[\t\n ]+/g, ' ');
      value = value.replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g,
        (full, x, char) => char);
      value = value.replace(/{\\([a-zA-Z])}/g,
        (full, char) => char);
      entry.entryTags[tag] = value;
    }
    entry.entryTags.type = entry.entryType;
    // add to bibliography
    bibliography.set(entry.citationKey, entry.entryTags);
  }
  return bibliography;
}

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
    // ...and listen for changes
    observer.observe(this, options);
  }

  parseIfPossible() {
    if (this.firstElementChild && this.firstElementChild.tagName === 'SCRIPT') {
      const newBibtex = this.firstElementChild.textContent;
      if (this.bibtex !== newBibtex) {
        this.bibtex = newBibtex;
        const bibliography = parseBibtex(this.bibtex);
        this.notify(bibliography);
      }
    }
  }

  connectedCallback() {
    this.list = this.root.querySelector('ol');
  }

  notify(bibliography) {
    const options = { detail: bibliography, bubbles: true };
    const event = new CustomEvent('onBibliographyChanged', options);
    this.dispatchEvent(event);
  }

  set entries(newEntries) {
    if (newEntries.size) {
      this.root.host.style.display = 'initial';
      this.list.innerHTML = '';

      for (const [key, entry] of newEntries) {
        const listItem = document.createElement('li');
        listItem.id = key;
        listItem.innerHTML = bibliography_cite(entry);
        this.list.appendChild(listItem);
      }
    } else {
      this.root.host.style.display = 'none';
    }

  }

  renderContent() {
    // compute and store bibliography
    // FrontMatter.bibliography = parseBibtex(this.bibtex);
    // this.notify();
    // Store.set('bibliography', bibliography);
    // compute and store citations
    // const citations = collectCitations();
    // Store.set('citations', citations);
  }

}
