import html from "./components/html";
import styles from "./components/styles";
import frontMatter from "./components/front-matter";
import bibliography from "./components/bibliography";
import expandData from "./components/data";
import meta from "./components/meta";
import banner from "./components/banner";
import byline from "./components/byline";
import appendix from "./components/appendix";
import appendixDistill from "./components/appendix-distill";
import citation from "./components/citation";
import footnote from "./components/footnote";
import DTMath from "./components/dt-math";
import markdown from "./components/markdown";
import code from "./components/code";
import typeset from "./components/typeset";
import hoverBox from "./components/hover-box-include";
import generateCrossref from "./components/generate-crossref";
import header from "./components/header";
import footer from "./components/footer";

function renderImmediately(dom) {
  html(dom);
  styles(dom);
}

function renderOnLoad(dom, data) {
  frontMatter(dom, data);
  bibliography(dom, data);
  expandData(dom, data);
  meta(dom, data);
  byline(dom, data);
  appendix(dom, data);
  markdown(dom, data);
  DTMath(dom, data);
  code(dom, data);
  citation(dom, data);
  footnote(dom, data);
  typeset(dom, data);
  hoverBox(dom, data);
}

// If we are in a browser, render automatically...
var browser = new Function("try { return this === window; }catch(e){ return false; }");
if (browser) {
  try {
    var data = {};
    renderImmediately(window.document);
    window.document.addEventListener("DOMContentLoaded", function (event) {
      renderOnLoad(window.document, data);
      // Add a banner if we're not on localhost.
      if (window.location.hostname !== "localhost" && window.location.origin !== "file://") {
        banner(window.document, data);
      }
      generateCrossref(data);
      // console.log(data);
    });
  } catch (error) {
    console.error("Window not defined");
  }
}

// If we are in node...
function render(dom, data) {
  renderImmediately(dom);
  renderOnLoad(dom, data);
  // Remove script tag so it doesn't run again in the client
  let s = dom.querySelector('script[src*="distill.pub/template"]');
  if (s) { s.parentElement.removeChild(s); };
}

// Distill specific rendering
function distillify(dom, data) {
  header(dom, data);
  appendixDistill(dom, data);
  footer(dom, data);
}

export {render as render};
export {distillify as distillify};
export {generateCrossref as generateCrossref};
