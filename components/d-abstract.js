import {Template} from "../mixins/template";

const T = Template("d-abstract", `
<style>
  d-abstract {
    display: block;
    font-size: 20px;
    line-height: 1.5rem;
  }
</style>
`, false);

export default class Abstract extends T(HTMLElement) {
  static get is() { return "d-abstract"; }
}

customElements.define(Abstract.is, Abstract);
