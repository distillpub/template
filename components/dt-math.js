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

import katex from "katex";

const html = `
<style>
dt-math[block] {
  display: block;
}
</style>
`;

export default function(dom, data) {
  let equationElements = [].slice.call(dom.querySelectorAll("dt-math"));
  equationElements.forEach(el => {
    let content = el.textContent;
    let displayMode = el.hasAttribute("block") ? true : false;
    el.innerHTML = html + katex.renderToString(content, {displayMode: displayMode});
  });
}