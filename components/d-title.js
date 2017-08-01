import { Template } from "../mixins/template";
import { page } from "./layout";

const T = Template("d-title", `
<style>

:host {
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-bottom: 100px;
}

::slotted(h1) {
  padding-top: 140px;
  padding-bottom: 24px;
  margin: 0;
  line-height: 1em;
  font-size: 48px;
  font-weight: 600;
}

d-byline {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

${page("::slotted(h1), ::slotted(h2)")}

</style>

<slot></slot>
<d-byline></d-byline>
`);

export class Title extends T(HTMLElement) {

  connectedCallback() {
    super.connectedCallback();

    // this.byline = document.createElement("d-byline");
    // this.appendChild(this.byline);
  }

}
