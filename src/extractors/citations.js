import { collect_citations } from '../helpers/citation.js';

export default function(dom, data) {
  data.citations = collect_citations(dom);
}
