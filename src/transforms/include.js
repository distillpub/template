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

import fetch from 'fetch';
let fetchUrl = fetch.fetchUrl;

export default function(dom, data) {

  var includeTags = [].slice.apply(dom.querySelectorAll('dt-include'));

  includeTags.forEach(el => {
    let src = el.getAttribute('src');
    fetchUrl(src, (err, meta, body) => {
      console.log(err, meta, body);
      el.innerHTML = body.toString();
    });
  });
  data.bibliography = bibliography;
  data.citations = citations;

}
