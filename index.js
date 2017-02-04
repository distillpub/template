import html from "./components/html";
import styles from "./components/styles";
import frontMatter from "./components/front-matter";
import bibliography from "./components/bibliography";
import expandData from "./components/expand-data";
import meta from "./components/meta";
import banner from "./components/banner";
import header from "./components/header";
import byline from "./components/byline";
import appendix from "./components/appendix";
import footer from "./components/footer";
import citation from "./components/citation";
import footnote from "./components/footnote";
import markdown from "./components/markdown";
import code from "./components/code";
import typeset from "./components/typeset";
import hoverBox from "./components/hover-box-include";
import generateCrossref from "./components/generate-crossref";

function renderImmediately(dom) {
  html(dom);
  styles(dom);
}

function renderOnLoad(dom, data) {
  frontMatter(dom, data);
  bibliography(dom, data);
  expandData(dom, data);
  meta(dom, data);
  header(dom, data);
  byline(dom, data);
  appendix(dom, data);
  footer(dom, data);
  markdown(dom, data);
  code(dom, data);
  citation(dom, data);
  footnote(dom, data);
  typeset(dom, data);
  hoverBox(dom, data);
}

// If we are in a browser, render automatically...
if(window && window.document) {
  let data = {};
  renderImmediately(window.document);
  window.document.addEventListener("DOMContentLoaded", (event) => {
    renderOnLoad(window.document, data);
    // Add a banner if we're not on localhost.
    if (window.location.hostname !== "localhost" && window.location.origin !== "file://") {
      banner(window.document, data);
    }
    generateCrossref(data);
  });
}

// If we are in node...
function render(dom, data) {
  renderImmediately(dom);
  renderOnLoad(dom, data);
  // Remove script tag so it doesn't run again in the client
  let s = dom.querySelector('script[src="http://distill.pub/template.js"]');
  if (s) { s.parentElement.removeChild(s); };
}

export {render as render};
export {html as html};
export {styles as styles};
export {frontMatter as frontMatter};
export {bibliography as bibliography};
export {meta as meta};
export {header as header};
export {appendix as appendix};
export {footer as footer};
export {citation as citation};
export {markdown as markdown};
export {code as code};
export {generateCrossref as generateCrossref};
