import {Template} from "../mixins/template";
import {body} from "./layout";
import bibtexParse from "bibtex-parse-js";

const T = Template("d-bibliography", `
<style>
d-bibliography {
  display: none;
}
</style>
`, false);

export default class Bibliography extends T(HTMLElement) {
  static get is() { return "d-bibliography"; }
  connectedCallback() {
    super.connectedCallback();
    let s = this.querySelector('script[type="text/bibtex"]');
    if (s) {
      let bibliography = {};
      let rawBib = s.textContent;
      let parsed = bibtexParse.toJSON(rawBib);
      if(parsed) {
        parsed.forEach(e => {
          for (var k in e.entryTags){
            var val = e.entryTags[k];
            val = val.replace(/[\t\n ]+/g, " ");
            val = val.replace(/{\\["^`\.'acu~Hvs]( )?([a-zA-Z])}/g,
                              (full, x, char) => char);
            val = val.replace(/{\\([a-zA-Z])}/g,
                              (full, char) => char);
            e.entryTags[k] = val;
          }
          bibliography[e.citationKey] = e.entryTags;
          bibliography[e.citationKey].type = e.entryType;
        });
      }
      console.log(bibliography);
    }
  }
}

customElements.define(Bibliography.is, Bibliography);
