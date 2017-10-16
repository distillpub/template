import { Template } from '../mixins/template';
import { bibliography_cite } from '../helpers/citation';

const T = Template('d-citation-list', `
<style>

d-citation-list {
  contain: content;
  overflow: hidden;
}

d-citation-list .references {
  grid-column: text;
}

d-citation-list .references .title {
  font-weight: 500;
}

</style>

<h3>References</h3>
<ol class='references' id='references-list'></ol>
`, false);

export function renderCitationList(element, entries) {
  if (entries.size > 0) {
    element.style.display = '';
    const list = document.getElementById('references-list');
    list.innerHTML = '';

    for (const [key, entry] of entries) {
      const listItem = document.createElement('li');
      listItem.id = key;
      listItem.innerHTML = bibliography_cite(entry);
      list.appendChild(listItem);
    }
  } else {
    element.style.display = 'none';
  }
}

export class CitationList extends T(HTMLElement) {

  connectedCallback() {
    super.connectedCallback();

    this.root.style.display = 'none';
  }

  set citations(citations) {
    renderCitationList(this.root, citations);
  }

}
