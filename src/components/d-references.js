import { Template } from "../mixins/template";
import { body } from "../helpers/layout";

const T = Template("d-references", `
<style>
d-references {
  display: block;
}
</style>
`, false);

export  class References extends T(HTMLElement) {

  connectedCallback() {
    super.connectedCallback();
  }

}
