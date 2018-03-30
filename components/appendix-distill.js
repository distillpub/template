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

export default function(dom, data) {
  let el = dom.querySelector('dt-appendix > div');
  if (el) {
    let newHTML = "";

    newHTML += `<h3>Updates and Corrections</h3>
    <p><a href="${data.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published. If you see a mistake or want to suggest a change, please <a class="github-issue" href="${data.githubUrl}/issues/new">create an issue on GitHub</a>.</p>`;

    newHTML += `<h3 id="citation">Citations and Reuse</h3>
    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/2.0/">CC-BY 2.0</a>, unless noted otherwise, with the <a class="github" href="${data.githubUrl}">source available on GitHub</a>. The figures that have been reused from other sources don't fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>

    <p>For attribution in academic contexts, please cite this work as</p>
    <pre class="citation short">${data.concatenatedAuthors}, "${data.title}", ${data.journal.title}, ${data.publishedYear}. http://doi.org/${data.doi}</pre>

    <p>BibTeX citation</p>
<pre class="citation long">@article{${data.slug},
  author = {${data.bibtexAuthors}},
  title = {${data.title}},
  journal = {${data.journal.title}},
  year = {${data.publishedYear}},
  url = {${data.url}},
  doi = {${data.doi}}
}</pre>`;

    let existingHTML = el.innerHTML;
    el.innerHTML = existingHTML + newHTML;
  }
}