import bibtexParse from "bibtex-parse-js";

export default function(dom, data) {
  let el = dom.querySelector('script[type="text/bibliography"]');
  let citations = [];
  let bibliography = {};
  //TODO If we don't have a local element, make a request for the document.
  if (el) {
    let rawBib = el.textContent;
    let parsed = bibtexParse.toJSON(rawBib);
    if(parsed) {
      parsed.forEach(e => {
        bibliography[e.citationKey] = e.entryTags;
        bibliography[e.citationKey].type = e.entryType;
      });
    }


    var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
    citeTags.forEach(el => {
      let key = el.getAttribute("key");
      if (key) {
        let citationKeys = key.split(",");
        citationKeys.forEach(key => {
          if (citations.indexOf(key) == -1){
            citations.push(key);
            if (!(key in bibliography)){
              console.warn("No bibliography entry found for: " + key);
            }
          }
        });
      }
    });
  }
  data.bibliography = bibliography;
  data.citations = citations;
}
