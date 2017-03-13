import {Template} from "../mixins/template";
import {body} from "./layout";

const T = Template("d-abstract", `
<style>
  d-abstract {
    display: block;
    font-size: 23px;
    line-height: 1.7em;
    margin-bottom: 140px;
  }
  ${body("d-abstract")}
</style>
`, false);

export default class Abstract extends T(HTMLElement) {
  static get is() { return "d-abstract"; }
}

customElements.define(Abstract.is, Abstract);
