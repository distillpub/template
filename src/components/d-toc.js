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

export class TOC extends HTMLElement {

  static get is() { return 'd-toc'; }

  connectedCallback() {
    if (!this.getAttribute('prerendered')) {
      window.onload = () => {
        const article = document.querySelector('d-article');
        const headings = article.querySelectorAll('h2, h3');
        renderTOC(this, headings);
      };
    }
  }

}

export function renderTOC(element, headings) {

  let ToC =`
  <style>

  d-toc {
    contain: layout style;
    display: block;
  }

  d-toc ul {
    padding-left: 0;
  }

  d-toc ul > ul {
    padding-left: 24px;
  }

  d-toc a {
    border-bottom: none;
    text-decoration: none;
  }

  </style>
  <nav role="navigation" class="table-of-contents"></nav>
  <h2>Table of contents</h2>
  <ul>`;

  for (const el of headings) {
    // should element be included in TOC?
    const isInTitle = el.parentElement.tagName == 'D-TITLE';
    const isException = el.getAttribute('no-toc');
    if (isInTitle || isException) continue;
    // create TOC entry
    const title = el.textContent;
    const link = '#' + el.getAttribute('id');

    let newLine = '<li>' + '<a href="' + link + '">' + title + '</a>' + '</li>';
    if (el.tagName == 'H3') {
      newLine = '<ul>' + newLine + '</ul>';
    } else {
      newLine += '<br>';
    }
    ToC += newLine;

  }

  ToC += '</ul></nav>';
  element.innerHTML = ToC;
}
