import {Template} from "../mixins/template";
import {body} from "./layout";
import bibtexParse from "bibtex-parse-js";
import mustache from "mustache";
import {page} from "./layout";


let mustacheTemplate = `
<style>
  d-bibliography {
    display: block;
    font-size: 13px;
    line-height: 1.7em;
    margin-bottom: 0;
    border-top: 1px solid rgba(0,0,0,0.1);
    color: rgba(0,0,0,0.5);
    background: rgb(250, 250, 250);
    padding-top: 36px;
    padding-bottom: 48px;
  }
  ${page("d-bibliography ol, d-bibliography h3")}
  d-bibliography .references {
    font-size: 12px;
    line-height: 20px;
  }
  d-bibliography .title {
    font-weight: 600;
  }
  d-bibliography ol {
    padding: 0;
  }
  d-bibliography li {
    margin-bottom: 12px;
  }
  d-bibliography h3 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 0;
    color: rgba(0,0,0,0.65);
    line-height: 1em;
  }
  d-bibliography a {
    color: rgba(0, 0, 0, 0.6);
  }
</style>
{{#hasCitations}}
  <h3>References</h3>
  <ol>
    {{#citations}}
      <li>
        <div class="title">Unsupervised representation learning with deep convolutional generative adversarial networks   <a href="https://arxiv.org/pdf/1511.06434.pdf">[PDF]</a></div>
        <div class="details">Radford, A., Metz, L. and Chintala, S., 2015. arXiv preprint arXiv:1511.06434.</div>
      </li>
  {{/citations}}
  </ol>
{{/hasCitations}}
`;

export default class Bibliography extends HTMLElement {
  static get is() { return "d-bibliography"; }

  connectedCallback() {
    let s = this.querySelector("script");
    if (s) {
      let bibliography = new Map();
      let rawBib = s.textContent;
      let parsed = bibtexParse.toJSON(rawBib);
      if(parsed) {
        parsed.forEach(e => {
          for (var k in e.entryTags) {
            var val = e.entryTags[k];
            val = val.replace(/[\t\n ]+/g, " ");
            val = val.replace(/{\\["^`\.'acu~Hvs]( )?([a-zA-Z])}/g,
                              (full, x, char) => char);
            val = val.replace(/{\\([a-zA-Z])}/g,
                              (full, char) => char);
            e.entryTags[k] = val;
          }
          e.entryTags.type = e.entryType;
          bibliography.set(e.citationKey, e.entryTags);
        });
      }
      this.data = bibliography;
    }
  }

  render() {
    this.citations = [];
    let citationElements = [].slice.apply(document.querySelectorAll("d-cite"));
    citationElements.forEach(el => { this.cite(el) });
    this.innerHTML = mustache.render(mustacheTemplate, {hasCitations: this.citations.length > 0, citations: this.citations});
  }

  cite(el) {
    let keyString = el.getAttribute("key");
    let keys = keyString ? keyString.split(",") : [];
    keys.forEach(key => {
      let citation = this.data[key];
      if (!this.data.has(key)) {
        console.error("Citation key  '" + key + "' not present in bibliography.")
      } else if (this.citations.indexOf(key) !== -1) {
        // Bibliography entry has already been cited
      } else {
        this.citations.push(key);
      }
    })

  }
}

customElements.define(Bibliography.is, Bibliography);
