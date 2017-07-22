import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-clike";

export class Code extends HTMLElement {

  constructor() {
    super();

    const options = {childList: true};
    let observer = new MutationObserver( (mutations) => {
      observer.disconnect();
      this.formatCode();
      observer.observe(this, options);
    })
    observer.observe(this, options);
    this.formatCode();
  }

  formatCode() {

    // check if we have content to render
    let content = this.textContent;
    if (!content) { return; }

    // check if language can be highlighted
    this.languageName = this.getAttribute('language');
    const language = Prism.languages[this.languageName];
    if (language == undefined) {
      console.warn(`Distill does not support highlighting your code block in "${this.languageName}".`);
      return;
    }

    this.innerHTML = "";
    const c = document.createElement("code");
    if (this.hasAttribute("block")) {
      // Let's normalize the tab indents
      content = content.replace(/\n/, "");
      const tabs = content.match(/\s*/);
      content = content.replace(new RegExp("\n" + tabs, "g"), "\n");
      content = content.trim();
      const p = document.createElement("pre");
      p.appendChild(c);
      this.appendChild(p);
    } else {
      this.appendChild(c);
    }

    c.setAttribute("class", "language-" + this.languageName);
    c.innerHTML = Prism.highlight(content, language);
  }
}

customElements.define("d-code", Code);

export const css = `
code {
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 4px 7px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

pre code {
  display: block;
  background: white;
  border-left: 3px solid rgba(0, 0, 0, 0.05);
  padding: 0 0 0 24px;
}


code[class*="language-"],
pre[class*="language-"] {
  text-shadow: 0 1px white;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
  text-shadow: none;
  background: #b3d4fc;
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
  text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #999;
}

.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #a67f59;
  background: hsla(0, 0%, 100%, .5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #07a;
}

.token.function {
  color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

`
