import katex from "katex";

const html = `
<style>
dt-math[block] {
  display: block;
}
</style>
`;

export default function(dom, data) {
  let equationElements = [].slice.call(dom.querySelectorAll("dt-math"));
  equationElements.forEach(el => {
    let content = el.textContent;
    let displayMode = el.hasAttribute("block") ? true : false;
    el.innerHTML = html + katex.renderToString(content, {displayMode: displayMode});
  });
}