import { parseBibliography } from '../components/d-bibliography';

export default function(dom, data) {
  const bibliographyTag = dom.querySelector('d-bibliography');
  if (!bibliographyTag) {
    console.warn('No bibliography tag found!');
    return;
  }
  data.bibliography = parseBibliography(bibliographyTag);
}
