import { collect_citations } from '../helpers/citation.js';

export default function(dom, data) {
  const citations = new Set(data.citations);
  const newCitations = collect_citations(dom);
  for (const citation of newCitations) {
    citations.add(citation);
  }
  data.citations = Array.from(citations);
}
