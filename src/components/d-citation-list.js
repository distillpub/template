import { bibliography_cite } from '../helpers/citation';

const styles = `
d-citation-list {
  contain: layout style;
}

d-citation-list .references {
  grid-column: text;
}

d-citation-list .references .title {
  font-weight: 500;
}
`;

export function renderCitationList(element, entries, dom=document) {
  if (entries.size > 0) {
    element.style.display = '';
    let list = element.querySelector('.references');
    if (list) {
      list.innerHTML = '';
    } else {
      const stylesTag = dom.createElement('style');
      stylesTag.innerHTML = styles;
      element.appendChild(stylesTag);

      const heading = dom.createElement('h3');
      heading.id = 'references';
      heading.textContent = 'References';
      element.appendChild(heading);

      list = dom.createElement('ol');
      list.id = 'references-list';
      list.className = 'references';
      element.appendChild(list);
    }

    for (const [key, entry] of entries) {
      const listItem = dom.createElement('li');
      listItem.id = key;
      listItem.innerHTML = bibliography_cite(entry);
      list.appendChild(listItem);
    }
  } else {
    element.style.display = 'none';
  }
}

export class CitationList extends HTMLElement {

  static get is() { return 'd-citation-list'; }

  connectedCallback() {
    if (!this.hasAttribute('distill-prerendered')) {
      this.style.display = 'none';
    }
  }

  set citations(citations) {
    renderCitationList(this, citations);
  }

}
