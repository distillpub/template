// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-env node, mocha */

import { FrontMatter } from './front-matter';

/* Extractors */
import ExtractFrontmatter from './extractors/front-matter';
import ExtractBibliography from './extractors/bibliography';
import ExtractCitations from './extractors/citations';

const extractors = new Map([
  ['ExtractFrontmatter', ExtractFrontmatter],
  ['ExtractBibliography', ExtractBibliography],
  ['ExtractCitations', ExtractCitations],
]);

/* Transforms */
import HTML from './transforms/html';
import Byline from './transforms/byline';
import OptionalComponents from './transforms/optional-components';
import Mathematics from './transforms/mathematics';
import Meta from './transforms/meta';
import { makeStyleTag } from './styles/styles';
import TOC from './transforms/toc';
import Typeset from './transforms/typeset';
import Polyfills from './transforms/polyfills';
import CitationList from './transforms/citation-list';
import Reorder from './transforms/reorder';

const transforms = new Map([
  ['HTML', HTML],
  ['makeStyleTag', makeStyleTag],
  ['OptionalComponents', OptionalComponents],
  ['TOC', TOC],
  ['Byline', Byline],
  ['Mathematics', Mathematics],
  ['Meta', Meta],
  ['Typeset', Typeset],
  ['Polyfills', Polyfills],
  ['CitationList', CitationList],
  ['Reorder', Reorder] // keep last
]);

/* Distill Transforms */
import DistillHeader from './distill-transforms/distill-header';
import DistillAppendix from './distill-transforms/distill-appendix';
import DistillFooter from './distill-transforms/distill-footer';

const distillTransforms = new Map([
  ['DistillHeader', DistillHeader],
  ['DistillAppendix', DistillAppendix],
  ['DistillFooter', DistillFooter],
]);

/* Exported functions */

export function render(dom, data, verbose=true) {
  let frontMatter;
  if (data instanceof FrontMatter) {
    frontMatter = data;
  } else {
    frontMatter = FrontMatter.fromObject(data);
  }
  // first, we collect static data from the dom
  for (const [name, extract] of extractors.entries()) {
    if (verbose) console.warn('Running extractor: ' + name);
    extract(dom, frontMatter, verbose);
  }
  // secondly we use it to transform parts of the dom
  for (const [name, transform] of transforms.entries()) {
    if (verbose) console.warn('Running transform: ' + name);
    // console.warn('Running transform: ', transform);
    transform(dom, frontMatter, verbose);
  }
  dom.body.setAttribute('distill-prerendered', '');
  // the function calling us can now use the transformed dom and filled data object
  if (data instanceof FrontMatter) {
    // frontMatter will already have needed properties
  } else {
    frontMatter.assignToObject(data);
  }
}

export function distillify(dom, data, verbose=true) {
  // thirdly, we can use these additional transforms when publishing on the Distill website
  for (const [name, transform] of distillTransforms.entries()) {
    if (verbose) console.warn('Running distillify: ', name);
    transform(dom, data, verbose);
  }
}

export function usesTemplateV2(dom) {
  const tags = dom.querySelectorAll('script');
  let usesV2 = undefined;
  for (const tag of tags) {
    const src = tag.src;
    if (src.includes('template.v1.js')) {
      usesV2 = false;
    } else if (src.includes('template.v2.js')) {
      usesV2 = true;
    } else if (src.includes('template.')) {
      throw new Error('Uses distill template, but unknown version?!');
    }
  }

  if (usesV2 === undefined) {
    throw new Error('Does not seem to use Distill template at all.');
  } else {
    return usesV2;
  }
}

export { FrontMatter }; // TODO: removable?

export const testing = {
  extractors: extractors,
  transforms: transforms,
  distillTransforms: distillTransforms
};
