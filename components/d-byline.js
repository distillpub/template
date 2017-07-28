import mustache from "mustache";
import {Template} from "../mixins/template";
import {page} from "./layout";

const T = Template("d-byline", `
<style>
  :host {
    box-sizing: border-box;
    font-size: 13px;
    line-height: 20px;
    display: block;
    /* border-top: 1px solid rgba(0, 0, 0, 0.1);*/
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.1);*/
    color: rgba(0, 0, 0, 0.6);
    padding-top: 20px;
    padding-bottom: 20px;
  }
  ${page(".byline")}
  d-article.centered {
    text-align: center;
  }
  a,
  d-article a {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    border-bottom: none;
  }
  d-article a:hover {
    text-decoration: underline;
    border-bottom: none;
  }
  .authors {
    text-align: left;
  }
  .name {
    font-weight: 600;
    display: inline;
    text-transform: uppercase;
  }
  .affiliation {
    display: inline;
  }
  .date {
    display: block;
    text-align: left;
  }
  .year, .month {
    display: inline;
  }
  .citation {
    display: block;
    text-align: left;
  }
  .citation div {
    display: inline;
  }

  @media(min-width: 768px) {
    {
    }
  }

  @media(min-width: 1080px) {
    {
      border-bottom: none;
    }

    a:hover {
      color: rgba(0, 0, 0, 0.9);
    }

    .authors {
      display: inline-block;
    }

    .author {
      display: inline-block;
      margin-right: 12px;
      /*padding-left: 20px;*/
      /*border-left: 1px solid #ddd;*/
    }

    .affiliation {
      display: block;
    }

    .author:last-child {
      margin-right: 0;
    }

    .name {
      display: block;
    }

    .date {
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      padding-left: 15px;
      margin-left: 15px;
      display: inline-block;
    }
    .year, .month {
      display: block;
    }

    .citation {
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      padding-left: 15px;
      margin-left: 15px;
      display: inline-block;
    }
    .citation div {
      display: block;
    }
  }
</style>

<div class='byline'></div>
`);

const mustacheTemplate = `
<div class="authors">
{{#authors}}
  <div class="author">
    {{#personalURL}}
      <a class="name" href="{{personalURL}}">{{name}}</a>
    {{/personalURL}}
    {{^personalURL}}
      <div class="name">{{name}}</div>
    {{/personalURL}}
    {{#affiliation}}
      {{#affiliationURL}}
        <a class="affiliation" href="{{affiliationURL}}">{{affiliation}}</a>
      {{/affiliationURL}}
      {{^affiliationURL}}
        <div class="affiliation">{{affiliation}}</div>
      {{/affiliationURL}}
    {{/affiliation}}
  </div>
  {{/authors}}
</div>
{{#publishedDate}}
<div class="date">
  <div class="month">{{publishedMonth}}. {{publishedDay}}</div>
  <div class="year">{{publishedYear}}</div>
</div>
{{/publishedDate}}
{{#citation}}
<a class="citation" href="#citation">
  <div>Citation:</div>
  <div>{{concatenatedAuthors}}, {{publishedYear}}</div>
</a>
{{/citation}}
`;

export default class Byline extends T(HTMLElement) {

  static get is() { return "d-byline"; }

  connectedCallback() {
    const frontmatter = document.querySelector('d-front-matter');
    const container = this.root.querySelector('.byline');
    container.innerHTML = mustache.render(mustacheTemplate, frontmatter.data);
    console.log(frontmatter.data)
  }

}

customElements.define(Byline.is, Byline);
