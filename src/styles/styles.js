import base from "./styles-base.css";
import layout from "./styles-layout.css";
import article from "./styles-article.css";
import print from "./styles-print.css";
import katex from '../../node_modules/katex/dist/katex.min.css'

let s = document.createElement("style");
s.textContent =  base + layout + print + article + katex;
document.querySelector("head").appendChild(s);
export default s;
