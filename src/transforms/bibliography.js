// import { renderBibliography, templateString } from '../components/d-bibliography';
import { parseBibtex } from '../helpers/bibtex';
import fs from 'fs';

export default function(dom, data) {
  const bibliographyTag = dom.querySelector('d-bibliography');
  if (!bibliographyTag) {
    console.warn('No bibliography tag present!');
    return;
  }

  const src = bibliographyTag.getAttribute('src');
  if (src) {
    const path = data.inputDirectory + '/' + src;
    const text = fs.readFileSync(path, 'utf-8');
    const bibliography = parseBibtex(text);
    const scriptTag = dom.createElement('script');
    scriptTag.type = 'text/json';
    scriptTag.textContent = JSON.stringify([...bibliography]);
    bibliographyTag.appendChild(scriptTag);
    bibliographyTag.removeAttribute('src');
  }
  // const bibliographyEntries = new Map(data.citations.map( citationKey => {
  //   const entry = data.bibliography.get(citationKey);
  //   return [citationKey, entry];
  // }));
  //
  // const prerenderedBibliography = dom.createElement('d-bibliography-prerendered');
  //
  // const template = dom.createElement('template');
  // template.innerHTML = templateString;
  // const clone = dom.importNode(template.content, true);
  // prerenderedBibliography.innerHTML = template.content;
  // renderBibliography(prerenderedBibliography, bibliographyEntries, dom);
  //
  // bibliographyTag.parentElement.insertBefore(bibliographyTag, prerenderedBibliography);
  // bibliographyTag.parentElement.removeChild(bibliographyTag);

}
