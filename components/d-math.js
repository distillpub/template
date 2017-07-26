import katex from "katex";
import { Mutating } from "../mixins/mutating.js"
import { Template } from "../mixins/template.js"

const templateString = `
<style>

d-math[block] {
  display: block;
}

</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css">

<span id="katex-container"></span>
`;

const TemplatedMath = Template("d-math", templateString);

export class Math extends Mutating(TemplatedMath(HTMLElement)) {

  renderContent() {
    const options = { displayMode: this.hasAttribute("block") };
    const container = this.shadowRoot.querySelector("#katex-container")
    katex.render(this.textContent, container, options);
  }
}

customElements.define("d-math", Math);
