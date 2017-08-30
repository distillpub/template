import { renderBibliography, templateString } from '../components/d-bibliography';

export default function(dom, data) {
  const bibliographyTag = dom.querySelector('d-bibliography');
  if (!bibliographyTag) {
    console.warn('No bibliography tag found!');
    return;
  }

  const bibliographyEntries = new Map(data.citations.map( citationKey => {
    const entry = data.bibliography.get(citationKey);
    return [citationKey, entry];
  }));

  const prerenderedBibliography = dom.createElement('d-bibliography-prerendered');

  const template = dom.createElement('template');
  template.innerHTML = templateString;
  const clone = dom.importNode(template.content, true);
  prerenderedBibliography.innerHTML = template.content;
  renderBibliography(prerenderedBibliography, bibliographyEntries, dom);

  bibliographyTag.parentElement.insertBefore(bibliographyTag, prerenderedBibliography);
  bibliographyTag.parentElement.removeChild(bibliographyTag);

}
