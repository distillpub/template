import marked from 'marked';

marked.setOptions({
  gfm: true,
  smartypants: true
});

export default function(dom, data) {
  let markdownElements = [].slice.call(dom.querySelectorAll('[dt-markdown]'));
  markdownElements.forEach(el => {
    let content = el.innerHTML;
    let indent = "  ";
    // Set default indents to the first or second line

    // content.replace("\n  ", "\n" + indent);
    el.innerHTML = marked(content);
  });
}
