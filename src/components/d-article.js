import { Template } from '../mixins/template';
import { Controller } from '../controller';

export const style =`
d-article {
  contain: content;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 2rem;
  color: rgba(0, 0, 0, 0.8);
}

d-article > * {
  grid-column: text;
}

@media(min-width: 768px) {
  d-article {
    font-size: 16px;
  }
}

@media(min-width: 1024px) {
  d-article {
    font-size: 0.9rem;
    line-height: 1.9em;
  }
}


/* H2 */


d-article .marker {
  text-decoration: none;
  border: none;
  counter-reset: section;
  grid-column: kicker;
  line-height: 1.7em;
}

d-article .marker:hover {
  border: none;
}

d-article .marker span {
  padding: 0 3px 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  top: 4px;
}

d-article .marker:hover span {
  color: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
}

d-article h2 {
  grid-column-end: page-end;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.25em;
  margin: 0 0 1rem 0;
}

@media(min-width: 1024px) {
  d-article h2 {
    font-size: 24px;
  }
}

/* H3 */

d-article h3 {
  font-weight: 700;
  font-size: 18px;
  line-height: 1.4em;
  margin-bottom: 24px;
  margin-top: 0;
}

@media(min-width: 1024px) {
  d-article h3 {
    font-size: 20px;
  }
}

/* H4 */

d-article h4 {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 1.4em;
}

d-article a {
  color: inherit;
}

d-article p,
d-article ul,
d-article ol {
  font-family: "Merriweather", georgia, serif;
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 1.7em;
}

d-article a {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-decoration: none;
}

d-article a:hover {
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
}

d-article .link {
  text-decoration: underline;
  cursor: pointer;
}

d-article ul,
d-article ol {
  padding-left: 24px;
}

d-article li {
  margin-bottom: 24px;
  margin-left: 0;
  padding-left: 0;
}

d-article pre {
  font-size: 14px;
  margin-bottom: 20px;
}

d-article hr {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 60px;
  margin-bottom: 60px;
}

d-article section {
  margin-top: 60px;
  margin-bottom: 60px;
}

/* Figure */

d-article figure {
  position: relative;
  margin-bottom: 36px;
}

d-article figure img {
  width: 100%;
}

d-article figure svg text,
d-article figure svg tspan {
}

d-article figure figcaption {
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  line-height: 1.5em;
}

@media(min-width: 1024px) {
  d-article figure figcaption {
    font-size: 13px;
  }
}

d-article figure.external img {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  padding: 18px;
  box-sizing: border-box;
}

d-article figure figcaption a {
  color: rgba(0, 0, 0, 0.6);
}

d-article span.equation-mimic {
  font-family: georgia;
  font-size: 115%;
  font-style: italic;
}

d-article figure figcaption b {
  font-weight: 600;
  color: rgba(0, 0, 0, 1.0);
}

d-article > d-code,
d-article section > d-code  {
  display: block;
}

d-article > d-math[block],
d-article section > d-math[block]  {
  display: block;
}

d-article .citation {
  color: #668;
  cursor: pointer;
}

d-include {
  width: auto;
  display: block;
}

d-figure {
  contain: content;
  overflow: hidden;
  height: 300px;
}

/* KaTeX */

.katex, .katex-prerendered {
  contain: content;
  display: inline-block;
}

`;


// export function addInferableTags(dom, frontMatter) {
//   const title = frontMatter.title;
//   if (title) {
//     const titleTag = document.querySelector()
//
//   }
// }

const isOnlyWhitespace = /^\s*$/;

export class Article extends HTMLElement {
  static get is() { return 'd-article'; }

  constructor() {
    super();

    new MutationObserver( (mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          switch (addedNode.nodeName) {
          case 'HR':
            console.warn('Use of <hr> tags in distill articles is discouraged as they interfere with layout! To separate sections, please just use h2 or h3 tags.');
            break;
          case '#text': { // usually text nodes are only linebreaks.
            const text = addedNode.nodeValue;
            if (!isOnlyWhitespace.test(text)) {
              console.warn('Use of unwrapped text in distill articles is discouraged as it breaks layout! Please wrap any text in a <span> or <p> tag. We found the following text: ' + text);
              const wrapper = document.createElement('span');
              wrapper.innerHTML = addedNode.nodeValue;
              addedNode.parentNode.insertBefore(wrapper, addedNode);
              addedNode.parentNode.removeChild(addedNode);
            }
          } break;
          }
        }
      }
    }).observe(this, {childList: true});
  }

  connectedCallback() {
    for (const [functionName, callback] of Object.entries(Controller.listeners)) {
      if (typeof callback === 'function') {
        document.addEventListener(functionName, callback);
      } else {
        console.error('Controller listeners need to be functions!');
      }
    }
  }

}
