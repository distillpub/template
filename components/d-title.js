import {Template} from "../mixins/template";
import {body} from "./layout";

const T = Template("d-title", `
<style>
d-title {
  box-sizing: border-box;
  display: block;
  width: 100%;
  background-color: hsl(200, 0%, 95%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
d-title h1 {
  padding-top: 100px;
  padding-bottom: 36px;
  margin: 0;
  line-height: 1em;
  font-size: 60px;
  font-weight: 400;
}
${body("d-title h1")}
</style>
`, false);

export default class Title extends T(HTMLElement) {
  static get is() { return "d-title"; }
  connectedCallback() {
    super.connectedCallback();
    this.byline = document.createElement("d-byline");
    let frontMatter = document.querySelector("d-front-matter");
    this.byline.render(frontMatter.data);
    this.appendChild(this.byline);
  }
}

customElements.define(Title.is, Title);
