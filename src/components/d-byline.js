import { Template } from '../mixins/template';
import { page } from '../helpers/layout';

const T = Template('d-byline', `
<style>
  :host {
    box-sizing: border-box;
    font-size: 13px;
    line-height: 20px;
    display: block;
    color: rgba(0, 0, 0, 0.6);
    padding-bottom: 20px;
  }
  ${page('.byline')}
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
    margin-top: 8px;
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
  .byline {
    line-height: 1.8em;
  }
  .byline::after {
    content: "";
    display: block;
    border-bottom: solid 1px #999;
    width: 40px;
    margin-top: 60px;
  }

  @media screen and (min-width: 768px), print {
    d-byline {
      border-bottom: none;
    }
    a:hover {
      color: rgba(0, 0, 0, 0.9);
    }
    .authors {
    }
    .author {
      margin-right: 12px;
    }
    .affiliation {
      display: inline;
    }
    .author:last-child {
      margin-right: 0;
    }
    .name {
      margin-right: 10px;
    }
    .date {
      display: none;
      margin-top: 0;
    }
    .year, .month {
    }
    .citation {
    }
    .citation div {
    }
  }
</style>

<div class='byline'>
</div>
`, true);

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
    <div>${frontMatter.concatenatedAuthors}, ${frontMatter.publishedYear}</div>
  </a>
  `;
}

export class Byline extends T(HTMLElement) {

  set frontMatter(frontMatter) {
    const container = this.root.querySelector('.byline');
    container.innerHTML = bylineTemplate(frontMatter);
  }

}
