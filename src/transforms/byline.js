import { bylineTemplate } from '../components/d-byline.js';

export default function(dom, data) {
  const byline = dom.querySelector('d-byline');
  if (byline) {
    byline.innerHTML = bylineTemplate(data);
    byline.setAttribute('prerendered', true);
  }
}
