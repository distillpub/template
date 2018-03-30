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

import bibtexParse from "bibtex-parse-js";

export default function(dom, data) {
  let el = dom.querySelector('script[type="text/bibliography"]');
  let bibliography = {};
  //TODO If we don't have a local element, make a request for the document.
  if (el) {
    let rawBib = el.textContent;
    let parsed = bibtexParse.toJSON(rawBib);
    if(parsed) {
      parsed.forEach(e => {
        for (var k in e.entryTags){
          var val = e.entryTags[k];
          val = val.replace(/[\t\n ]+/g, " ");
          val = val.replace(/{\\["^`\.'acu~Hvs]( )?([a-zA-Z])}/g,
                            (full, x, char) => char);
          val = val.replace(/{\\([a-zA-Z])}/g,
                            (full, char) => char);
          e.entryTags[k.toLowerCase()] = val;
        }
        bibliography[e.citationKey] = e.entryTags;
        bibliography[e.citationKey].type = e.entryType;
      });
    }
  }
  data.bibliography = bibliography;
}
