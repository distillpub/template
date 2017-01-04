import base from './styles-base';
import layout from './styles-layout';
import article from './styles-article';
import code from './styles-code';

export default function(dom, data) {
  let s = dom.createElement("style");
  s.textContent = base + layout + article + code;
  dom.querySelector("head").appendChild(s);
}
