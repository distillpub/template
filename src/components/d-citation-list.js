import { Template } from '../mixins/template';
import { bibliography_cite } from '../helpers/citation';

const T = Template('d-citation-list', `
<style>

:host {
  contain: content;
}
.references {
  font-size: 12px;
  line-height: 20px;
}
.title {
  font-weight: 600;
}
ol {
  padding: 0 0 0 18px;
}
li {
  margin-bottom: 12px;
}
h3 {
  font-size: 15px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 0;
  color: rgba(0,0,0,0.65);
  line-height: 1em;
}
a {
  color: rgba(0, 0, 0, 0.6);
}

</style>

<h3>References</h3>
<ol class='references' id='references-list' ></ol>
`);

export function renderCitationList(element, entries) {
  if (entries.size > 0) {
    element.host.style.display = 'initial';
    const list = element.querySelector('#references-list');
    list.innerHTML = '';

    for (const [key, entry] of entries) {
      const listItem = document.createElement('li');
      listItem.id = key;
      listItem.innerHTML = bibliography_cite(entry);
      list.appendChild(listItem);
    }
  } else {
    element.host.style.display = 'none';
  }
}

export class CitationList extends T(HTMLElement) {

  connectedCallback() {
    this.root.host.style.display = 'none';
  }

  set citations(citations) {
    renderCitationList(this.root, citations);
  }

}
