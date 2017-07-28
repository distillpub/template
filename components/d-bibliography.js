import bibtexParse from "bibtex-parse-js";
import { Template } from "../mixins/template";
import { bibliography_cite } from "./citation";

const name = 'd-bibliography';
const T = Template(name, `
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

function parseBibtex(bibtex) {
  const bibliography = new Map();
  const parsedEntries = bibtexParse.toJSON(bibtex);
  for (const entry of parsedEntries) {
    // normalize tags; note entryTags is an object, not Map
    for (const tag in entry.entryTags) {
      let value = entry.entryTags[tag];
      value = value.replace(/[\t\n ]+/g, " ");
      value = value.replace(/{\\["^`\.'acu~Hvs]( )?([a-zA-Z])}/g,
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

export default class Bibliography extends T(HTMLElement) {

  constructor() {
    super()

    this.citations = new Array();
    this.finishedLoading = false;
  }

  connectedCallback() {
    this.list = this.root.querySelector('ol');
    // bibliography is initially hidden
    this.root.host.style.display = 'none';
    // parse bibliography
    const scriptTag = this.querySelector("script");
    if (scriptTag) {
      this.bibliography = parseBibtex(scriptTag.textContent);
      this.finishedLoading = true;
      // look through document and register existing citations
      document.querySelectorAll('d-cite')
        .forEach(citation => this.registerCitation(citation));
    } else {
      console.error("No script tag with bibtex found in d-bibliography tag!")
    }

  }

  getEntry(key) {
    return this.bibliography.get(key);
  }

  hasEntry(key) {
    return this.bibliography.has(key);
  }

  getIndex(key) {
    return this.citations.indexOf(key);
  }

  registerCitation(citation) {
    // a d-cite element may cite multiple sources
    const keyString = citation.getAttribute("key");
    const keys = keyString ? keyString.split(",") : [];
    for (const key of keys) {
      if (!this.bibliography.has(key)) {
        console.error("Citation key '" + key + "' is not present in bibliography!")
      } else if (this.citations.indexOf(key) === -1) {
        this.citations.push(key);
        const entry = this.getEntry(key);
                // ensure citations list is visible
        this.root.host.style.display = 'initial';
        // construct and append list item to show citation
        const listItem = document.createElement('li');
        listItem.id = key;
        listItem.innerHTML = bibliography_cite(entry);
        this.list.appendChild(listItem);
      }
    }
  }

}

customElements.define(Bibliography.is, Bibliography);
