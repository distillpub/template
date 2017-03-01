import code from './hover-box.txt';

export default function(dom) {
  let s = dom.createElement("script");
  s.textContent = code;
  dom.querySelector("body").appendChild(s);
}
