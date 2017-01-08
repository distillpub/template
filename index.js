import html from "./components/html";
import styles from "./components/styles";
import frontMatter from "./components/front-matter";
import bibliography from "./components/bibliography";
import expandData from "./components/expand-data";
import meta from "./components/meta";
import header from "./components/header";
import appendix from "./components/appendix";
import footer from "./components/footer";
import citation from "./components/citation";
import markdown from "./components/markdown";
import code from "./components/code";
import testData from "./test-data";


function render(dom, data) {
  data = data || {};
  html(dom);
  styles(dom);
  document.addEventListener("DOMContentLoaded", function(event) {
    frontMatter(dom, data);
    bibliography(dom, data);
    expandData(dom, data);
    meta(dom, data);
    header(dom, data);
    appendix(dom, data);
    footer(dom, data);
    markdown(dom, data);
    code(dom, data);
    citation(dom, data);
    console.log("final data:")
    for (var k in data) {console.log("   ", k, ": ", data[k])}
  });
}


if(window.document) {
  render(window.document)//, testData);
}

export default render;
