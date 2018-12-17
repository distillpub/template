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

import katex from 'katex';
import { renderMathInElement } from '../helpers/katex-auto-render';

export default function(dom, data) {
  let needsCSS = false;
  const body = dom.querySelector('body');

  if (!body) {
    console.warn("No body tag found!");
    return;
  }

  if (data.katex && data.katex.delimiters) {
    global.document = dom;
    renderMathInElement(body, data.katex);
  }

  // render d-math tags
  const mathTags = body.querySelectorAll('d-math');
  if (mathTags.length > 0) {
    needsCSS = true;
    console.warn(`Prerendering ${mathTags.length} math tags...`);
    for (const mathTag of mathTags) {
      const localOptions = { displayMode: mathTag.hasAttribute('block') };
      const options = Object.assign(localOptions, data.katex);
      const html = katex.renderToString(mathTag.textContent, options);
      const container = dom.createElement('span');
      container.innerHTML = html;
      mathTag.parentElement.insertBefore(container, mathTag);
      mathTag.parentElement.removeChild(mathTag);
    }
  }

  if (needsCSS) {
    const katexCSSTag = '<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">';
    dom.head.insertAdjacentHTML('beforeend', katexCSSTag);
  }

}
