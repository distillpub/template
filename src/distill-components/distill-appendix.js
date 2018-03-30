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

import { serializeFrontmatterToBibtex } from '../helpers/bibtex';

const styles = `
<style>
  distill-appendix {
    contain: layout style;
  }

  distill-appendix .citation {
    font-size: 11px;
    line-height: 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 18px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0, 0, 0, 0.02);
    padding: 10px 18px;
    border-radius: 3px;
    color: rgba(150, 150, 150, 1);
    overflow: hidden;
    margin-top: -12px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  distill-appendix > * {
    grid-column: text;
  }
</style>
`;

export function appendixTemplate(frontMatter) {
  let html = styles;

  if (typeof frontMatter.githubUrl !== 'undefined') {
    html += `
    <h3 id="updates-and-corrections">Updates and Corrections</h3>
    <p>`;
    if (frontMatter.githubCompareUpdatesUrl) {
      html += `<a href="${frontMatter.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published.`;
    }
    html += `
    If you see mistakes or want to suggest changes, please <a href="${frontMatter.githubUrl + '/issues/new'}">create an issue on GitHub</a>. </p>
    `;
  }

  const journal = frontMatter.journal;
  if (typeof journal !== 'undefined' && journal.title === 'Distill') {
    html += `
    <h3 id="reuse">Reuse</h3>
    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> with the <a class="github" href="${frontMatter.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>
    `;
  }

  if (typeof frontMatter.publishedDate !== 'undefined') {
    html += `
    <h3 id="citation">Citation</h3>
    <p>For attribution in academic contexts, please cite this work as</p>
    <pre class="citation short">${frontMatter.concatenatedAuthors}, "${frontMatter.title}", Distill, ${frontMatter.publishedYear}.</pre>
    <p>BibTeX citation</p>
    <pre class="citation long">${serializeFrontmatterToBibtex(frontMatter)}</pre>
    `;
  }

  return html;
}

export class DistillAppendix extends HTMLElement {

  static get is() { return 'distill-appendix'; }

  set frontMatter(frontMatter) {
    this.innerHTML = appendixTemplate(frontMatter);
  }

}
