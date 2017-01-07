import ymlParse from "js-yaml";

export default function(dom, data) {
  let el = dom.querySelector('script[type="text/front-matter"]');

  //TODO If we don't have a local element, make a request for the document.
  if (el) {
    let text = el.textContent;
    let localData = ymlParse.safeLoad(text);

    data.title = localData.title;
    data.description = localData.description;
    data.authors = localData.authors.map((author, i) =>{
      let a = {};
      let name = Object.keys(author)[0];
      let names = name.split(" ");
      a.firstName = names.slice(0, names.length - 1).join(" ");
      a.lastName = names[names.length -1];
      a.personalURL = author[name];
      if(localData.affiliations[i]) {
        let affiliation = Object.keys(localData.affiliations[i])[0];
        a.affiliation = affiliation;
        a.affiliationURL = localData.affiliations[i][affiliation];
      }
      return a;
    });
  }

}
