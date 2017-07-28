import { Template } from "../mixins/template";

const name = 'd-footnote-list';
const T = Template(name, `
<style>
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

a.footnote-backlink {
  color: rgba(0,0,0,0.3);
  padding-left: 0.5em;
}


</style>

<h3>Footnotes</h3>
<ol></ol>
`);

export default class FootnoteList extends T(HTMLElement) {

  static get is() { return name; }

  connectedCallback() {
    this.list = this.root.querySelector('ol');
    this.footnotes = new Map();
    // footnotes list is initially hidden
    this.root.host.style.display = 'none';
    // look through document and register existing footnotes
    document.querySelectorAll('d-footnote')
      .forEach(footnote => this.registerFootnote(footnote));
  }

  registerFootnote(element) {
    // check if we already know about this footnote
    if (!this.footnotes.has(element.id)) {
      this.footnotes.set(element.id, element);
      // ensure footnote list is visible
      this.root.host.style.display = 'initial'
      // construct and append list item to show footnote
      const listItem = document.createElement('li');
      listItem.innerHTML = element.innerHTML;
      const backlink = document.createElement('a');
      backlink.setAttribute('class', 'footnote-backlink');
      backlink.textContent = '[↩]';
      backlink.href = `#${element.id}`;
      listItem.appendChild(backlink);
      this.list.appendChild(listItem);
    } /*else {
      console.debug('Had already registered footnote ' + element.id + '!')
    }*/
  }

}

customElements.define(name, FootnoteList);
