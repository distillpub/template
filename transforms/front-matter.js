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

  data.authors = localData.authors ? localData.authors : [];

  data.authors = data.authors.map((author, i) =>{
    let a = {};
    let name = Object.keys(author)[0];
    if ((typeof author) === "string") {
      name = author;
    } else {
      a.personalURL = author[name];
    }
    let names = name.split(" ");
    a.name = name;
    a.firstName = names.slice(0, names.length - 1).join(" ");
    a.lastName = names[names.length -1];
    if(localData.affiliations[i]) {
      let affiliation = Object.keys(localData.affiliations[i])[0];
      if ((typeof localData.affiliations[i]) === "string") {
        affiliation = localData.affiliations[i]
      } else {
        a.affiliationURL = localData.affiliations[i][affiliation];
      }
      a.affiliation = affiliation;
    }
    return a;
  });
  

}
