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


import { headerTemplate } from '../distill-components/distill-header-template';

export default function(dom, data) {
  const headerTag = dom.querySelector('distill-header');
  if (!headerTag) {
    const header = dom.createElement('distill-header');
    header.innerHTML = headerTemplate;
    header.setAttribute('distill-prerendered', "");
    const body = dom.querySelector('body');
    body.insertBefore(header, body.firstChild);
  }
}
