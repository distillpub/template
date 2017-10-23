// import style from '../styles/d-byline.css';

export function bylineTemplate(frontMatter) {
  return `
  <div class="byline grid">
    <div class="authors-affiliations grid">
      <h3>Authors</h3>
      <h3>Affiliations</h3>
      ${frontMatter.authors.map(author => `
        <p class="author">
          ${author.personalURL ? `
            <a class="name" href="${author.personalURL}">${author.name}</a>` : `
            <div class="name">${author.name}</div>`}
        </p>
        <p class="affiliation">
          ${author.affiliationURL ? `
            <a class="affiliation" href="${author.affiliationURL}">${author.affiliation}</a>` : `
            <div class="affiliation">${author.affiliation}</div>`}
        </p>
      `).join('')}
    </div>
    <div>
      <h3>Published</h3>
      ${frontMatter.publishedDate ? `
        <p>${frontMatter.publishedMonth}. ${frontMatter.publishedDay} ${frontMatter.publishedYear}</p> ` : `
        <p><em>Not published yet.</em></p>`}
    </div>
    <div>
      <h3>DOI</h3>
      ${frontMatter.doi ? `
        <p>${frontMatter.doi}</p>` : `
        <p><em>No DOI yet.</em></p>`}
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
