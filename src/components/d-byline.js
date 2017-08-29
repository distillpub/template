export const style = `
d-byline {
  font-size: 13px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
  padding-bottom: 20px;
  contain: content;
}

d-byline .byline {
  grid-column: margin-left / page;
  line-height: 1.8em;
}

d-byline .byline::after {
  content: "";
  display: block;
  border-bottom: solid 1px #999;
  width: 40px;
  margin-top: 60px;
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
}

d-byline .author {
  margin-right: 12px;
}

d-byline .author .name {
  font-weight: 600;
  display: inline;
  text-transform: uppercase;
  margin-right: 10px;
}

d-byline .author .affiliation {
  display: inline;
}

d-byline .date {
  display: inline;
  text-align: left;
  margin-right: 12px;
}

d-byline .date .year,
d-byline .date .month {
  display: inline;
}

d-byline .citation {
  display: inline;
  text-align: left;
}

d-byline .citation div {
  display: inline;
}
`;


export function bylineTemplate(frontMatter) {
  return `
<div class='byline'>
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
</div>
`;
}

export class Byline extends HTMLElement {

  static get is() { return 'd-byline'; }

  set frontMatter(frontMatter) {
    this.innerHTML = bylineTemplate(frontMatter);
  }

}
