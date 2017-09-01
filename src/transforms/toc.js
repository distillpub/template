import { renderTOC } from '../components/d-toc';

export default function(dom) {
  const article = dom.querySelector('d-article');
  const toc = dom.querySelector('d-toc');
  if (toc) {
    const headings = article.querySelectorAll('h2, h3');
    renderTOC(toc, headings);
    toc.setAttribute('prerendered', 'true');
  }
}
