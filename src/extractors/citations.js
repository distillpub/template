import { collectCitations } from '../components/d-cite';

export default function(dom, data) {
  data.citations = collectCitations(dom);
}
