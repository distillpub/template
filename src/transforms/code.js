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

import Prism from 'prismjs';

export default function(dom, data) {
  let codeElements = [].slice.call(dom.querySelectorAll('dt-code'));
  codeElements.forEach(el => {
    let content = el.textContent;
    el.innerHTML = '';
    let language = el.getAttribute('language');
    let c = dom.createElement('code');
    if (el.getAttribute('block') === '') {
      // Let's normalize the tab indents
      content = content.replace(/\n/, '');
      let tabs = content.match(/\s*/);
      content = content.replace(new RegExp('\n' + tabs, 'g'), '\n');
      content = content.trim();
      let p = dom.createElement('pre');
      p.appendChild(c);
      el.appendChild(p);
    } else {
      el.appendChild(c);
    }
    let highlighted = content;
    if (Prism.languages[language]) {
      c.setAttribute('class', 'language-' + language);
      highlighted = Prism.highlight(content, Prism.languages[language]);
    }
    c.innerHTML = highlighted;
  });
}
