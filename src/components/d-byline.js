import style from '../styles/d-byline.css';

export function bylineTemplate(frontMatter) {
  return `
  <div class="byline grid">
    <div class="authors">
      <h3>Authors</h3>
      ${frontMatter.authors.map(author => `
        <p>
          ${author.personalURL
            ? `<a class="name" href="${author.personalURL}">${author.name}</a>`
            : `<div class="name">${author.name}</div>`
          }
        </pdiv>
      `).join("")}
    </div>
    <div class="affiliations">
      <h3>Affiliations</h3>
      ${frontMatter.authors.map(author => `
        <p>
          ${author.affiliationURL
            ? `<a class="affiliation" href="${author.affiliationURL}">${author.affiliation}</a>`
            : `<div class="affiliation">${author.affiliation}</div>`
          }
        </p>
      `).join("")}
    </div>
    <div>
      <h3>Published</h3>
      <p>${frontMatter.publishedMonth}. ${frontMatter.publishedDay} ${frontMatter.publishedYear}</p>
    </div>
    <div>
      <h3>DOI</h3>
      <p>${frontMatter.doi}</p>
    </div>
  </div>
`;
}

export class Byline extends HTMLElement {

  static get is() { return 'd-byline'; }

  set frontMatter(frontMatter) {
    this.innerHTML = bylineTemplate(frontMatter);
  }

}
