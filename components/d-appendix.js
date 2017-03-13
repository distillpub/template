import {Template} from "../mixins/template";
import {page} from "./layout";

const T = Template("d-appendix", `
<style>
  d-appendix {
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
  ${page("d-appendix p, d-appendix h3, d-appendix pre")}
  d-appendix h3 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 0;
    color: rgba(0,0,0,0.65);
    line-height: 1em;
  }
  d-appendix a {
    color: rgba(0, 0, 0, 0.6);
  }
</style>
<!-- slot -->
<d-references></d-references>
`, false);

export default class Appendix extends T(HTMLElement) {
  static get is() { return "d-appendix"; }
}

customElements.define(Appendix.is, Appendix);
