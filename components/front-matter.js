import ymlParse from "js-yaml";

export default function(dom, data) {
  let localData = {};
  let el = dom.querySelector('script[type="text/front-matter"]');
  if (el) {
    let text = el.textContent;
    localData = ymlParse.safeLoad(text);
  }

  data.title = localData.title ? localData.title : "Untitled";
  data.description = localData.description ? localData.description : "No description.";
  data.published = localData.published ? new Date(localData.published) : new Date("Invalid");
  data.updated = localData.updated ? new Date(localData.updated) : new Date("Invalid");

  data.authors = localData.authors ? localData.authors : [];

  data.authors = data.authors.map((author, i) =>{
    let a = {};
    let name = Object.keys(author)[0];
    let names = name.split(" ");
    a.name = name;
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
