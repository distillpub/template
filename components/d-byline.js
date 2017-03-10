import mustache from "mustache";
import {Template} from "../mixins/template";
import {page} from "./layout";

const T = Template("d-byline", `
<style>
  d-byline {
    box-sizing: border-box;
    font-size: 12px;
    line-height: 18px;
    display: block;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.8);
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: grey;
  }
  ${page("d-byline .byline")}
  d-article.centered d-byline {
    text-align: center;
  }
  d-byline a,
  d-article d-byline a {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
    border-bottom: none;
  }
  d-article d-byline a:hover {
    text-decoration: underline;
    border-bottom: none;
  }
  d-byline .authors {
    text-align: left;
  }
  d-byline .name {
    display: inline;
    text-transform: uppercase;
  }
  d-byline .affiliation {
    display: inline;
  }
  d-byline .date {
    display: block;
    text-align: left;
  }
  d-byline .year, d-byline .month {
    display: inline;
  }
  d-byline .citation {
    display: block;
    text-align: left;
  }
  d-byline .citation div {
    display: inline;
  }

  @media(min-width: 768px) {
    d-byline {
    }
  }

  @media(min-width: 1080px) {
    d-byline {
      border-bottom: none;
    }

    d-byline a:hover {
      color: rgba(0, 0, 0, 0.9);
    }

    d-byline .authors {
      display: inline-block;
    }

    d-byline .author {
      display: inline-block;
      margin-right: 12px;
      /*padding-left: 20px;*/
      /*border-left: 1px solid #ddd;*/
    }

    d-byline .affiliation {
      display: block;
    }

    d-byline .author:last-child {
      margin-right: 0;
    }

    d-byline .name {
      display: block;
    }

    d-byline .date {
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      padding-left: 15px;
      margin-left: 15px;
      display: inline-block;
    }
    d-byline .year, d-byline .month {
      display: block;
    }

    d-byline .citation {
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      padding-left: 15px;
      margin-left: 15px;
      display: inline-block;
    }
    d-byline .citation div {
      display: block;
    }
  }
</style>
`, false);

const mustacheTemplate = `
<div class="byline">
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
  <div class="date">
    <div class="month">{{publishedMonth}}. {{publishedDay}}</div>
    <div class="year">{{publishedYear}}</div>
  </div>
  <a class="citation" href="#citation">
    <div>Citation:</div>
    <div>{{concatenatedAuthors}}, {{publishedYear}}</div>
  </a>
</div>
`;

export default class Byline extends T(HTMLElement) {
  static get is() {
    return "d-byline";
  }
  render(data) {
    this.innerHTML = mustache.render(mustacheTemplate, data);
  }
}

customElements.define(Byline.is, Byline);

