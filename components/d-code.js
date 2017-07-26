import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-clike";
import css from "prismjs/themes/prism.css";

import { Template } from "../mixins/template.js"
import { Mutating } from "../mixins/mutating.js"



const templateString = `
<style>

code {
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 4px 7px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

pre code {
  display: block;
  background: white;
  border-left: 3px solid rgba(0, 0, 0, 0.05);
  padding: 0 0 0 24px;
}

${css}
</style>

<code id="code-container"></code>

`

const Templated = Template("d-code", templateString);

export class Code extends Mutating(Templated(HTMLElement)) {

  renderContent() {

    // check if language can be highlighted
    this.languageName = this.getAttribute('language');
    if (!this.languageName) {
      console.warn(`You need to provide a language attribute to your <d-code> block to let us know how to highlight your code; e.g.:\n <d-code language="python">zeros = np.zeros(shape)</d-code>.`);
      return;
    }
    const language = Prism.languages[this.languageName];
    if (language == undefined) {
      console.warn(`Distill does not yet support highlighting your code block in "${this.languageName}".`);
      return;
    }

    let content = this.textContent;
    const codeTag = this.shadowRoot.querySelector("#code-container");

    if (this.hasAttribute("block")) {
      // normalize the tab indents
      content = content.replace(/\n/, "");
      const tabs = content.match(/\s*/);
      content = content.replace(new RegExp("\n" + tabs, "g"), "\n");
      content = content.trim();
      // wrap code block in pre tag if needed
      if (codeTag.parentNode instanceof ShadowRoot) {
        const preTag = document.createElement("pre");
        this.shadowRoot.removeChild(codeTag)
        preTag.appendChild(codeTag);
        this.shadowRoot.appendChild(preTag);
      }

    }

    codeTag.className = `language-${this.languageName}`;
    codeTag.innerHTML = Prism.highlight(content, language);
  }

}

customElements.define("d-code", Code);
