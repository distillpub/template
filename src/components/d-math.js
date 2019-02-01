// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
  contain: style;
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
    if (DMath.katexOptions.delimiters) {
      if (!DMath.katexAdded) {
        DMath.addKatex();
      } else {
        DMath.katexLoadedCallback();
      }
    }
  }

  static get katexOptions() {
    if (!DMath._katexOptions) {
      DMath._katexOptions = {
        delimiters: [ { 'left':'$$', 'right':'$$', 'display': false } ]
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
      renderMathInElement(document.body, DMath.katexOptions);
    }
  }

  static addKatex() {
    // css tag can use this convenience function
    document.head.insertAdjacentHTML('beforeend', katexCSSTag);
    // script tag has to be created to work properly
    const scriptTag = document.createElement('script');
    scriptTag.src = katexJSURL;
    scriptTag.async = true;
    scriptTag.onload = DMath.katexLoadedCallback;
    scriptTag.crossorigin = 'anonymous';
    document.head.appendChild(scriptTag);

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
