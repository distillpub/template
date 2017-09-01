/*global katex */
import { Mutating } from '../mixins/mutating.js';
import { Template } from '../mixins/template.js';

import style from '../styles/d-math.css';

// attaches renderMathInElement to window
import { renderMathInElement } from '../helpers/katex-auto-render';

export const katexJSURL = 'https://distill.pub/third-party/katex/katex.min.js';
export const katexCSSTag = '<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">';

const T = Template('d-math', `
${katexCSSTag}
<style>

:host {
  display: inline-block;
  contain: content;
}

:host([block]) {
  display: block;
}

${style}
</style>
<span id='katex-container'></span>
`);

// DMath, not Math, because that would conflict with the JS built-in
export class DMath extends Mutating(T(HTMLElement)) {

  static set katexOptions(options) {
    DMath._katexOptions = options;
    if (DMath.katexOptions.delimiters && !DMath.katexAdded) {
      DMath.addKatex();
    }
  }

  static get katexOptions() {
    if (!DMath._katexOptions) {
      DMath._katexOptions = {
        delimiters: [ { 'left':'$', 'right':'$', 'display':true } ]
      };
    }
    return DMath._katexOptions;
  }

  static katexLoadedCallback() {
    // render all d-math tags
    const mathTags = document.querySelectorAll('d-math');
    for (const mathTag of mathTags) {
      mathTag.renderContent();
    }
    // transform inline delimited math to d-math tags
    if (DMath.katexOptions.delimiters) {
      const article = document.querySelector('d-article');
      renderMathInElement(article, DMath.katexOptions);
    }
  }

  static addKatex() {
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

  get options() {
    const localOptions = { displayMode: this.hasAttribute('block') };
    return Object.assign(localOptions, DMath.katexOptions);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!DMath.katexAdded) {
      DMath.addKatex();
    }
  }

  renderContent() {
    if (typeof katex !== 'undefined') {
      const container = this.root.querySelector('#katex-container');
      katex.render(this.textContent, container, this.options);
    }
  }

}

DMath.katexAdded = false;
DMath.inlineMathRendered = false;
window.DMath = DMath; // TODO: check if this can be removed, or if we should expose a distill global
