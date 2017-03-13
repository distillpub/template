import {Template} from "../mixins/template";
import {page} from "./layout";

const T = Template("d-appendix", `
<style>
  d-appendix {
    display: block;
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 0;
    border-top: 1px solid rgba(0,0,0,0.1);
    color: rgba(0,0,0,0.5);
    background: rgb(250, 250, 250);
    padding-top: 36px;
    padding-bottom: 60px;
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
  d-appendix .citation {
    font-size: 11px;
    line-height: 15px;
    border-left: 2px solid rgba(0, 0, 0, 0.1);
    padding: 0 0 0 18px;
    overflow: hidden;
    margin-top: 0px;
  }
  d-appendix .references {
    font-size: 12px;
    line-height: 20px;
  }
  d-appendix a {
    color: rgba(0, 0, 0, 0.6);
  }
  d-appendix ol,
  d-appendix ul {
    padding-left: 24px;
  }
</style>
<!-- slot -->
<d-references></d-references>
<distill-appendix></distill-appendix>
`, false);

export default class Appendix extends T(HTMLElement) {
  static get is() { return "d-appendix"; }
  connectedCallback() {
    super.connectedCallback();
    //TODO: Check for distill journal
    let distillAppendix = document.createElement("distill-appendix");
    let journalData = [];
    distillAppendix.render(journalData);
    this.appendChild(distillAppendix);
  }
}

customElements.define(Appendix.is, Appendix);
