/* eslint-env node, mocha */

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
import Polyfills from './transforms/polyfills';
import Meta from './transforms/meta';
import Typeset from './transforms/typeset';
// import Bibliography from './transforms/bibliography';

const transforms = [
  HTML, Polyfills, Meta, Typeset//, Bibliography
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
    extract(dom, data);
  }
  // secondly we use it to transform parts of the dom
  for (const transform of transforms) {
    transform(dom, data);
  }
  // the function calling us can now use the transformed dom and filled data object
}

export function distillify(dom, data) {
  // thirdly, we optionally use these additional transforms when publishing on the Distill website
  for (const transform of distillTransforms) {
    transform(dom, data);
  }
}
