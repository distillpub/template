import marked from 'marked';

marked.setOptions({
  gfm: true,
  smartypants: true
});

export default function(dom, data) {
  let markdownElements = [].slice.call(dom.querySelectorAll('[markdown]'));
  markdownElements.forEach(el => {
    let content = el.innerHTML;
    // Set default indents
    content = content.replace(/\n/, "");
    let tabs = content.match(/\s*/);
    content = content.replace(new RegExp("\n" + tabs, "g"), "\n");
    content = content.trim();

    el.innerHTML = marked(content);
  });
}
