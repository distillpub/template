import { Template } from "../mixins/template";
import { page } from "../helpers/layout";

const T = Template("d-byline", `
<style>
  d-byline {
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

  @media(min-width: 1080px) {
    d-byline {
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

<div class='byline'>
</div>
`, false);

export function bylineTemplate(frontMatter) {
  return `
  <div class="authors">
    ${frontMatter.authors.map( author => `<div class="author">
      ${author.personalURL ?
        `<a class="name" href="${author.personalURL}">${author.name}</a>`
      :
        `<div class="name">${author.name}</div>`
      }
      ${author.affiliationURL ?
        `<a class="affiliation" href="${author.affiliationURL}">${author.affiliation}</a>`
      :
        `<div class="affiliation">${author.affiliation}</div>`
      }
    </div>`).join('\n')}
  </div>
  <div class="date">
    <div class="month">${frontMatter.publishedMonth}. ${frontMatter.publishedDay}</div>
    <div class="year">${frontMatter.publishedYear}</div>
  </div>
  <a class="citation" href="#citation">
    <div>Citation:</div>
    <div>${frontMatter.concatenatedAuthors}, ${frontMatter.publishedYear}</div>
  </a>
  `;
}

export class Byline extends T(HTMLElement) {

  set frontMatter(frontMatter) {
    const container = this.querySelector('.byline');
    container.innerHTML = bylineTemplate(frontMatter);
  }

}
