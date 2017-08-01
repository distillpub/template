import ymlParse from "js-yaml";
import expandData from "../transforms/expand-data"

export default class FrontMatter extends HTMLElement {
  static get is() { return "d-front-matter"; }
  constructor() {
    super();
    this.data = {};
  }
  connectedCallback() {
    const el = this.querySelector("script");
    if (el) {
      const text = el.textContent;
      this.parse(ymlParse.safeLoad(text));
    }
  }
  parse(localData) {
    this.data.title = localData.title ? localData.title : "Untitled";
    this.data.description = localData.description ? localData.description : "No description.";
    this.data.publishedDate =  localData.published ? new Date(localData.published) : false;

    this.data.authors = localData.authors ? localData.authors : [];

    this.data.authors = this.data.authors.map((author, i) =>{
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
      if (localData.affiliations[i]) {
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

    expandData(null, this.data);
  }
}

customElements.define(FrontMatter.is, FrontMatter);