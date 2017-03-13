import {Template} from "../mixins/template";

const T = Template("d-cite", `
  dt-cite {
    color: hsla(206, 90%, 20%, 0.7);
  }
  dt-cite .citation-number {
    cursor: default;
    white-space: nowrap;
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
    font-size: 75%;
    color: hsla(206, 90%, 20%, 0.7);
    display: inline-block;
    line-height: 1.1em;
    text-align: center;
    position: relative;
    top: -2px;
    margin: 0 2px;
  }
  figcaption dt-cite .citation-number {
    font-size: 11px;
    font-weight: normal;
    top: -2px;
    line-height: 1em;
  }
</style>
`, false);

export default class Cite extends T(HTMLElement) {
  static get is() { return "d-cite"; }
}

customElements.define(Cite.is, Cite);