import base from './styles-base.css';
import layout from './styles-layout.css';
import article from './styles-article.css';
import code from './styles-code.css';

export default function(dom) {
  let s = dom.createElement("style");
  s.textContent = base + layout + article + code;
  dom.querySelector("head").appendChild(s);
}
