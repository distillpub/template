import { Template } from '../mixins/template';

const T = Template('d-footnote-list', `
<style>

d-footnote-list {
  contain: layout style;
}

d-footnote-list > * {
  grid-column: text;
}

d-footnote-list a.footnote-backlink {
  color: rgba(0,0,0,0.3);
  padding-left: 0.5em;
}

</style>

<h3>Footnotes</h3>
<ol></ol>
`, false);

export class FootnoteList extends T(HTMLElement) {

  connectedCallback() {
    super.connectedCallback();

    this.list = this.root.querySelector('ol');
    // footnotes list is initially hidden
    this.root.style.display = 'none';
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
      this.root.style.display = '';

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
      this.root.style.display = 'none';
    }
  }

}
