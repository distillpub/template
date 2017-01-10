export default function(dom) {
  if (!dom.querySelector("html").getAttribute("lang")) {
    dom.querySelector("html").setAttribute("lang", "en")
  }

  let head = dom.querySelector("head");

  if (!dom.querySelector("meta[charset]")) {
    let meta = dom.createElement("meta");
    meta.setAttribute("charset", "utf-8");
    head.appendChild(meta);
  }
  if (!dom.querySelector("meta[name=viewport]")) {
    let meta = dom.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "width=device-width, initial-scale=1");
    head.appendChild(meta);
  }
}
