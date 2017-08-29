import { parseFrontmatter } from '../components/d-front-matter';

export default function(dom, data) {
  const frontMatterTag = dom.querySelector('d-front-matter');
  if (!frontMatterTag) {
    console.warn('No front matter tag found!');
    return;
  }
  const extractedData = parseFrontmatter(frontMatterTag);
  data.mergeFromYMLFrontmatter(extractedData);
}
