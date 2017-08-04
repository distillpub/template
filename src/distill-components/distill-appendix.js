const styles = `
<style>
  distill-appendix h3 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 0;
    color: rgba(0,0,0,0.65);
    line-height: 1em;
  }
  distill-appendix a {
    color: rgba(0, 0, 0, 0.6);
  }
  distill-appendix ol,
  distill-appendix ul {
    padding-left: 24px;
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
  }
</style>
`

export function appendixTemplate(frontMatter) {
  return `
  ${styles}

  <h3 id="updates-and-corrections">Updates and Corrections</h3>
  <p><a href="">View all changes</a> to this article since it was first published. If you see mistakes or want to suggest changes, please <a href="${frontMatter.githubUrl + '/issues/new'}">create an issue on GitHub</a>. </p>

  <h3 id="reuse">Reuse</h3>
  <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/2.0/">CC-BY 2.0</a> with the <a class="github" href="${frontMatter.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>

  <h3 id="citation">Citation</h3>
  <p>For attribution in academic contexts, please cite this work as</p>
  <pre class="citation short">${frontMatter.concatenatedAuthors}, "${frontMatter.title}", Distill, ${frontMatter.publishedYear}.</pre>
  <p>BibTeX citation</p>
  <pre class="citation long">@article{${frontMatter.slug},
  author = {${frontMatter.bibtexAuthors}},
  title = {${frontMatter.title}},
  journal = {Distill},
  year = {${frontMatter.publishedYear}},
  note = {${frontMatter.url}}
  }</pre>
  `;
}

export class DistillAppendix extends HTMLElement {

  static get is() { return "distill-appendix"; }

  set frontMatter(frontMatter) {
    this.innerHTML = appendixTemplate(frontMatter);
  }

}
