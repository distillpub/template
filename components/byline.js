import mustache from "mustache";

const html = `
<style>
  dt-byline {
    font-size: 12px;
    line-height: 18px;
    display: block;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
    padding-top: 12px;
    padding-bottom: 12px;
  }
  dt-article.centered dt-byline {
    text-align: center;

  }
  dt-byline a,
  dt-article dt-byline a {
    text-decoration: none;
    border-bottom: none;
  }
  dt-article dt-byline a:hover {
    text-decoration: underline;
    border-bottom: none;
  }
  dt-byline .authors {
    text-align: left;
  }
  dt-byline .name {
    display: inline;
    text-transform: uppercase;
  }
  dt-byline .affiliation {
    display: inline;
  }
  dt-byline .date {
    display: block;
    text-align: left;
  }
  dt-byline .year, dt-byline .month {
    display: inline;
  }
  dt-byline .citation {
    display: block;
    text-align: left;
  }
  dt-byline .citation div {
    display: inline;
  }

  @media(min-width: 768px) {
    dt-byline {
    }
  }

  @media(min-width: 1080px) {
    dt-byline {
      border-bottom: none;
      margin-bottom: 70px;
    }

    dt-byline a:hover {
      color: rgba(0, 0, 0, 0.9);
    }

    dt-byline .authors {
      display: inline-block;
    }

    dt-byline .author {
      display: inline-block;
      margin-right: 12px;
      /*padding-left: 20px;*/
      /*border-left: 1px solid #ddd;*/
    }

    dt-byline .affiliation {
      display: block;
    }

    dt-byline .author:last-child {
      margin-right: 0;
    }

    dt-byline .name {
      display: block;
    }

    dt-byline .date {
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      padding-left: 15px;
      margin-left: 15px;
      display: inline-block;
    }
    dt-byline .year, dt-byline .month {
      display: block;
    }

    dt-byline .citation {
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      padding-left: 15px;
      margin-left: 15px;
      display: inline-block;
    }
    dt-byline .citation div {
      display: block;
    }
  }
</style>

`;

const template = `
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
  {{#publishedYear}}
  <div class="date">
    <div class="month">{{publishedMonth}}. {{publishedDay}}</div>
    <div class="year">{{publishedYear}}</div>
  </div>
  {{/publishedYear}}
  {{#publishedYear}}
  <a class="citation" href="#citation">
    <div>Citation:</div>
    <div>{{concatenatedAuthors}}, {{publishedYear}}</div>
  </a>
  {{/publishedYear}}
</div>
`

export default function(dom, data) {
  let el = dom.querySelector('dt-byline');
  if (el) {
    el.innerHTML = html + mustache.render(template, data);
  }
}
