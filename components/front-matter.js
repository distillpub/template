import ymlParse from "js-yaml";

export default function(dom, data) {
  let el = dom.querySelector('script[type="text/front-matter"]');
  let text = el.textContent;
  let localData = ymlParse.load(text);

  data.title = localData.title;
  data.description = localData.description;
  data.authors = localData.authors.map((author, i) =>{
    let a = {};
    let name = Object.keys(author)[0];
    let names = name.split(" ");
    let affiliation = Object.keys(localData.affiliations[i])[0];
    a.firstName = names.slice(0, names.length - 1).join(" ");
    a.lastName = names[names.length -1];
    a.personalURL = author[name];
    a.affiliation = affiliation;
    a.afiiliationURL = localData.affiliations[i][affiliation];
    return a;
  });
}
