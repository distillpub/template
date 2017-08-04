import { Template } from '../mixins/template';

const T = Template('d-footnote-list', `
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

export class FootnoteList extends T(HTMLElement) {

  connectedCallback() {
    this.list = this.root.querySelector('ol');
    // footnotes list is initially hidden
    this.root.host.style.display = 'none';
    // look through document and register existing footnotes
    // Store.subscribeTo('footnotes', (footnote) => {
    //   this.renderFootnote(footnote);
    // });
  }

  // TODO: could optimize this to accept individual footnotes?
  set footnotes(footnotes) {
    this.list.innerHTML = '';
    if (footnotes.length) {
      // ensure footnote list is visible
      this.root.host.style.display = 'initial';

      for (const footnote of footnotes) {
        // construct and append list item to show footnote
        const listItem = document.createElement('li');
        listItem.id = footnote.id + '-listing';
        listItem.innerHTML = footnote.innerHTML;

        const backlink = document.createElement('a');
        backlink.setAttribute('class', 'footnote-backlink');
        backlink.textContent = '[↩]';
        backlink.href = '#' + footnote.id;

        listItem.appendChild(backlink);
        this.list.appendChild(listItem);
      }
    } else {
      // ensure footnote list is invisible
      this.shadowRoot.host.style.display = 'none';
    }
  }

}
