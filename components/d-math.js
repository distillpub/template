import katex from "katex";

export const html = `
<style>
dt-math[block] {
  display: block;
}
</style>
`;

export class Math extends HTMLElement {

  constructor() {
    super();

    const options = {childList: true};
    let observer = new MutationObserver( (mutations) => {
      observer.disconnect();
      this.renderComponent();
      observer.observe(this, options);
    })
    // try a first render
    this.renderComponent();
    // listen for changes
    observer.observe(this, options);
  }

  renderComponent() {
    const displayMode = this.hasAttribute("block");
    const options = { displayMode: displayMode };
    const renderedMath = katex.renderToString(this.textContent, options);
    this.innerHTML = html + renderedMath
  }
}

customElements.define("d-math", Math);
