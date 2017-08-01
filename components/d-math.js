import katex from "katex";
import { Mutating } from "../mixins/mutating.js"
import { Template } from "../mixins/template.js"
import katexCSS from "../node_modules/katex/dist/katex.min.css"

const T = Template("d-math", `
<style>

d-math[block] {
  display: block;
}

${katexCSS}

</style>

<span id="katex-container"></span>
`);

export class DMath extends Mutating(T(HTMLElement)) {

  renderContent() {
    const options = { displayMode: this.hasAttribute("block") };
    const container = this.root.querySelector("#katex-container");
    katex.render(this.textContent, container, options);
  }

}
