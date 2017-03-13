import {Template} from "../mixins/template";
import {body} from "./layout";

const T = Template("d-references", `
<style>
d-references {
  display: block;
}
</style>
`, false);

export default class References extends T(HTMLElement) {
  static get is() { return "d-references"; }
  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define(References.is, References);
