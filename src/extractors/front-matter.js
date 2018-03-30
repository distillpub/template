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
