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

import { renderCitationList } from '../components/d-citation-list'; // (element, entries)

export default function(dom, data) {
  const citationListTag = dom.querySelector('d-citation-list');
  if (citationListTag) {
    const entries = new Map(data.citations.map( citationKey => {
      return [citationKey, data.bibliography.get(citationKey)];
    }));
    renderCitationList(citationListTag, entries, dom);
    citationListTag.setAttribute('distill-prerendered', 'true');
  }
}
