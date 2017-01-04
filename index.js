import citeData from "./components/cite-data";
import styles from "./components/styles";
import header from "./components/header";
import appendix from "./components/appendix";
import footer from "./components/footer";
import citation from "./components/citation";
import markdown from "./components/markdown";
import code from "./components/code";



function render(dom, data) {
  styles(dom, data);
  document.addEventListener("DOMContentLoaded", function(event) {
    citeData(dom, data)
    header(dom, data);
    appendix(dom, data);
    footer(dom, data);
    markdown(dom, data);
    code(dom, data);
    citation(dom, data);
  });
}

if(window.document) {
  render(window.document, []);
}

export default render;
