import katex from 'katex';
import { renderMathInElement } from '../helpers/katex-auto-render';

export default function(dom, data) {
  let needsCSS = false;
  const article = dom.querySelector('d-article');

  if (data.katex && data.katex.delimiters) {
    global.document = dom;
    renderMathInElement(article, data.katex);
  }

  // render d-math tags
  const mathTags = article.querySelectorAll('d-math');
  if (mathTags.length > 0) {
    needsCSS = true;
    console.warn(`Prerendering ${mathTags.length} math tags...`);
    for (const mathTag of mathTags) {
      const localOptions = { displayMode: mathTag.hasAttribute('block') };
      const options = Object.assign(localOptions, data.katex);
      const html = katex.renderToString(mathTag.textContent, options);
      const container = dom.createElement('span');
      container.innerHTML = html;
      mathTag.parentElement.insertBefore(container, mathTag);
      mathTag.parentElement.removeChild(mathTag);
    }
  }

  if (needsCSS) {
    const katexCSSTag = '<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">';
    dom.head.insertAdjacentHTML('beforeend', katexCSSTag);
  }

}
