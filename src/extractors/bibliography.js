import { parseBibtex } from '../helpers/bibtex';
import fs from 'fs';
import { parseBibliography } from '../components/d-bibliography';

export default function(dom, data) {
  const bibliographyTag = dom.querySelector('d-bibliography');
  if (!bibliographyTag) {
    console.warn('No bibliography tag found!');
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

  data.bibliography = parseBibliography(bibliographyTag);
}
