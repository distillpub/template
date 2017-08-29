/*global katex */
import { Mutating } from '../mixins/mutating.js';
import { Template } from '../mixins/template.js';

const katexJSURL = 'https://distill.pub/third-party/katex/katex.min.js';
const katexCSSTag = '<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">';

const T = Template('d-math', `
<style>

:host {
  display: inline-block;
  contain: content;
}

:host([block]) {
  display: block;
}

</style>

${katexCSSTag}

<span id="katex-container"></span>
`);


// DMath, not Math, because that's a JS built-in
export class DMath extends Mutating(T(HTMLElement)) {

  static katexLoadedCallback() {
    const mathTags = document.querySelectorAll('d-math');
    for (const mathTag of mathTags) {
      mathTag.renderContent();
    }
  }

  connectedCallback() {
    if (!DMath.katexAdded) {
      // script tag has to be created to work properly
      const scriptTag = document.createElement('script');
      scriptTag.src = katexJSURL;
      scriptTag.async = true;
      scriptTag.onload = DMath.katexLoadedCallback;
      scriptTag.crossorigin = 'anonymous';
      document.head.appendChild(scriptTag);
      // css tag can use this convenience function
      document.head.insertAdjacentHTML('beforeend', katexCSSTag);

      DMath.katexAdded = true;
    }
  }

  renderContent() {
    if (typeof katex !== 'undefined') {
      const options = { displayMode: this.hasAttribute('block') };
      const container = this.root.querySelector('#katex-container');
      katex.render(this.textContent, container, options);
    }
  }

}

DMath.katexAdded = false;
window.DMath = DMath; // TODO: check if this can be removed, or if we should expose a distill global
