import {Template} from "../mixins/template";
import {page} from "./layout";

const T = Template("d-title", `
<style>
d-title {
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-bottom: 100px;
}
d-title h1 {
  padding-top: 140px;
  padding-bottom: 24px;
  margin: 0;
  line-height: 1em;
  font-size: 48px;
  font-weight: 600;
}
${page("d-title h1")}
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
