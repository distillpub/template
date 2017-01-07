const html = `
<style>
  dt-appendix {
    display: block;
    font-family: "Open Sans";
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 0;
    border-top: 1px solid rgba(0,0,0,0.1);
    color: rgba(0,0,0,0.5);
    background: rgba(0,0,0,0.025);
    padding-top: 36px;
    padding-right: 24px;
    padding-bottom: 60px;
    padding-left: 24px;
  }
  dt-appendix h3 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 18px;
    margin-bottom: 18px;
    color: rgba(0,0,0,0.65);
  }
  dt-appendix .citation {
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
  dt-appendix .references {
    font-size: 12px;
    line-height: 20px;
  }
  dt-appendix a {
    color: rgba(0, 0, 0, 0.6);
  }
</style>

<div class="l-body">
  <h3>References</h3>
  <dt-bibliography></dt-bibliography>
  <h3 id="citation">Errors, Reuse, and Citation</h3>
  <p>If you see mistakes or want to suggest changes, please submit a pull request on <a class="github">github</a>.</p>
  <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/2.0/">CC-BY 2.0</a>, unless noted otherwise, with the source available on available on <a class="github">github</a>. The figures that have been reused from other sources don't fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>
  <p>For attribution in academic contexts, please cite this work as</p>
  <pre class="citation short"></pre>
  <p>BibTeX citation</p>
  <pre class="citation long"></pre>
</div>
`;

//   distill.data().then(function(data) {
//     var as = el.querySelectorAll("a.github");
//     [].forEach.call(as, function(a) {
//       a.setAttribute("href", data.github);
//     });
//     el.querySelector(".citation.short").textContent = data.concatenatedAuthors + ", " + '"' + data.title + '", Distill, ' + data.firstPublishedYear + ".";
//     var bibtex  = "@article{" + data.slug + ",\n";
//         bibtex += "  author = {" + data.bibtexAuthors + "},\n";
//         bibtex += "  title = {" + data.title + "},\n";
//         bibtex += "  journal = {Distill},\n";
//         bibtex += "  year = {" + data.firstPublishedYear + "},\n";
//         bibtex += "  note = {" + data.url + "}\n";
//         bibtex += "}";
//     el.querySelector(".citation.long").textContent = bibtex;
//   })

export default function(dom, data) {
  let el = dom.querySelector('dt-appendix')
  if (el) el.innerHTML = html;
}
