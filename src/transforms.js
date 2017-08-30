/* eslint-env node, mocha */

import { FrontMatter } from './front-matter';

/* Extractors */
import ExtractFrontmatter from './extractors/front-matter';
import ExtractBibliography from './extractors/bibliography';
import ExtractCitations from './extractors/citations';

const extractors = [
  ExtractFrontmatter,
  ExtractBibliography,
  ExtractCitations,
];

/* Transforms */
import HTML from './transforms/html';
import Byline from './transforms/byline';
import Polyfills from './transforms/polyfills';
import Mathematics from './transforms/mathematics';
import Meta from './transforms/meta';
import { makeStyleTag } from './styles/styles';
import TOC from './transforms/toc';
import Typeset from './transforms/typeset';
// import Bibliography from './transforms/bibliography';

const transforms = [
  HTML, makeStyleTag, TOC, Byline, Polyfills, Mathematics, Meta, Typeset//, Bibliography
];

/* Distill Transforms */
import DistillHeader from './distill-transforms/distill-header';
import DistillAppendix from './distill-transforms/distill-appendix';
import DistillFooter from './distill-transforms/distill-footer';

const distillTransforms = [
  DistillHeader, DistillAppendix, DistillFooter,
];

/* Exported functions */

export function render(dom, data) {
  // first, we collect static data from the dom
  for (const extract of extractors) {
    // console.warn('Running extractor: ', extract);
    extract(dom, data);
  }
  // secondly we use it to transform parts of the dom
  for (const transform of transforms) {
    // console.warn('Running transform: ', transform);
    transform(dom, data);
  }
  // the function calling us can now use the transformed dom and filled data object
}

export function distillify(dom, data) {
  // thirdly, we can use these additional transforms when publishing on the Distill website
  for (const transform of distillTransforms) {
    // console.warn('Running distillify: ', transform);
    transform(dom, data);
  }
}

export { FrontMatter };
