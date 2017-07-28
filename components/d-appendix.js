import { Template } from "../mixins/template";
import { page } from "./layout";

const T = Template("d-appendix", `
<style>

:host {
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

${page(".l-body")}

</style>

<div class="l-body">
  <slot></slot>
</div>
`);

export default class Appendix extends T(HTMLElement) {

  static get is() { return "d-appendix"; }

}

customElements.define(Appendix.is, Appendix);
