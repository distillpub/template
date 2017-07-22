import "webcomponents.js/webcomponents-hi-ce.js";

import * as frontMatter from "./components/d-front-matter";
import * as title from "./components/d-title";
import * as byline from "./components/d-byline";
import * as article from "./components/d-article";
import * as abstract from "./components/d-abstract";
import * as toc from "./components/d-toc";
import * as styles from "./components/styles";
import * as appendix from "./components/d-appendix";
import * as distillAppendix from "./components/distill-appendix";
import * as bibliography from "./components/d-bibliography";
import * as references from "./components/d-references";
import { css as codeCss } from "./components/d-code";
import * as math from "./components/d-math";

let codeStyle = document.createElement("style");
codeStyle.textContent = codeCss;
document.querySelector("head").appendChild(codeStyle);

document.addEventListener("DOMContentLoaded", function() {
  // Render byline with authors list.

  // Render distill appendix with distill journal data.
  // document.querySelector("distill-appendix").render([]);

})
