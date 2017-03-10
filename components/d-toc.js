import {Template} from "../mixins/template";

const T = Template("d-toc", `
<style>
d-toc {
  display: block;
}
</style>
`, false);

export default class Toc extends T(HTMLElement) {
  static get is() {
    return "d-toc";
  }
}

customElements.define(Toc.is, Toc);