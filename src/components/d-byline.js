export const style = `
d-byline {
  font-size: 13px;
  line-height: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.6);
  padding-top: 20px;
  padding-bottom: 20px;
  contain: content;
  min-height: 42px;
}

d-byline .byline-container {
  grid-column: margin-left / page;
}

d-byline a,
d-article d-byline a {
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  border-bottom: none;
}

d-article d-byline a:hover {
  text-decoration: underline;
  border-bottom: none;
}

d-byline .authors {
  text-align: left;
  contain: content;
}

.author .name {
  font-weight: 600;
  display: inline;
  text-transform: uppercase;
  contain: content;
}

.author .affiliation {
  display: inline;
}

d-byline .date {
  display: block;
  text-align: left;
  margin-top: 8px;
}

.date .year, .date .month {
  display: inline;
}

d-byline .citation {
  display: block;
  text-align: left;
}

.citation div {
  display: inline;
}

@media screen and (min-width: 768px), print {

  a:hover {
    color: rgba(0, 0, 0, 0.9);
  }

  d-byline .authors {
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

  .author .name {
    display: block;
  }

  d-byline .date {

    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 15px;
    margin-left: 15px;
    margin-top: 0;
    display: inline-block;
  }
  .date .year, .date .month {
    display: block;
  }

  d-byline .citation {
    align-self: flex-end;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    padding-left: 15px;
    margin-left: 15px;
    display: inline-block;
  }
  .citation div {
    display: block;
  }

  .byline-container {
    display: flex;
  }
}`;


export function bylineTemplate(frontMatter) {
  return `
<div class='byline-container'>
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
</div>
`;
}

export class Byline extends HTMLElement {

  static get is() { return 'd-byline'; }

  set frontMatter(frontMatter) {
    this.innerHTML = bylineTemplate(frontMatter);
  }

}
