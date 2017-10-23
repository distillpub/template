import { renderCitationList } from '../components/d-citation-list'; // (element, entries)

export default function(dom, data) {
  const citationListTag = dom.querySelector('d-citation-list');
  if (citationListTag) {
    const entries = new Map(data.citations.map( citationKey => {
      return [citationKey, data.bibliography.get(citationKey)];
    }));
    renderCitationList(citationListTag, entries, dom);
  }
}
