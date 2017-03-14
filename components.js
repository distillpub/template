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

document.addEventListener("DOMContentLoaded", function() {
  // Render byline with authors list.

  // Render distill appendix with distill journal data.
  document.querySelector("distill-appendix").render([]);

})

export {frontMatter as frontMatter};
export {title as title};
export {byline as byline};
export {article as article};
export {abstract as abstract};
export {toc as toc};
export {styles as styles};
export {appendix as appendix};
export {distillAppendix as distillAppendix};
export {bibliography as bibliography};
export {references as references};