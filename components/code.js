import Prism from "prismjs";

export default function(dom, data) {
  let codeElements = [].slice.call(dom.querySelectorAll("code"));
  codeElements.forEach(el => {
    // let content = el.innerHTML;
    // el.innerHTML = "";
    // let p = dom.createElement("pre");
    // let c = dom.createElement("code");
    // console.log(content)
    let highlighted = Prism.highlightElement(el);
    // c.innerHTML = highlighted;
    // p.appendChild(c);
    // el.appendChild(p);

  });
}
