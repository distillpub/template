import bibtexParse from "bibtex-parse-js";

export default function(dom, data) {

  //TODO populate bibliography

  let rawBib = `
  @article{gregor2015draw,
    title={DRAW: A recurrent neural network for image generation},
    author={Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan},
    journal={arXivreprint arXiv:1502.04623},
    year={2015}
  }
  @article{mercier2011humans,
    title={Why do humans reason? Arguments for an argumentative theory},
    author={Mercier, Hugo and Sperber, Dan},
    journal={Behavioral and brain sciences},
    volume={34},
    number={02},
    pages={57--74},
    year={2011},
    publisher={Cambridge Univ Press}
  }`;

  var bibliography = {};
  bibtexParse.toJSON(rawBib).forEach(e => {
    bibliography[e.citationKey] = e.entryTags;
    bibliography[e.citationKey].type = e.entryType;
  });

  let citations = {};
  var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
  citeTags.forEach(el => {
    let citationKeys = el.textContent.split(",");
    citationKeys.forEach(key => {
      if (bibliography[key]) {
        citations[key] = bibliography[key];
      } else {
        console.warn("No bibliography entry found for: " + key);
      }
    });
  });
  data.citations = citations;
}
