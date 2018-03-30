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

const html = `
<style>
  dt-banner {
    background: #FFF59D;
    display: block;
    text-align: center;
    color: black;
    height: 70px;
    line-height: 70px;
  }
</style>
<div>This article is a draft, awaiting review for publication in Distill</div>
`;

export default function(dom, data) {
  let banner = dom.createElement('dt-banner');
  banner.innerHTML = html;
  let b = dom.querySelector('body');
  b.insertBefore(banner, b.firstChild);
  banner.addEventListener('click', function() {
    banner.style.display = 'none';
  });
}
