import { parseFrontmatter } from '../components/d-front-matter';
import { mergeFromYMLFrontmatter } from '../front-matter.js';

export default function(dom, data) {
  const frontMatterTag = dom.querySelector('d-front-matter');
  if (!frontMatterTag) {
    console.warn('No front matter tag found!');
    return;
  }
  const extractedData = parseFrontmatter(frontMatterTag);
  mergeFromYMLFrontmatter(data, extractedData);
}
