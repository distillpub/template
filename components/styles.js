import base from "./styles-base.css";
import layout from "./styles-layout.css";
import article from "./styles-article.css";
import code from "./styles-code.css";
import print from "./styles-print.css";

let s = document.createElement("style");
s.textContent =  base + layout + code + print;
document.querySelector("head").appendChild(s);
export default s;