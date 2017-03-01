import base from './styles-base.css';
import layout from './styles-layout.css';
import article from './styles-article.css';
import code from './styles-code.css';
import print from './styles-print.css';

export default function(dom) {
  let s = dom.createElement("style");
  s.textContent = base + layout + article + code + print;
  dom.querySelector("head").appendChild(s);
}
