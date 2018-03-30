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

export default function(dom, data) {

  var fnTags = [].slice.apply(dom.querySelectorAll('dt-fn'));
  var fnContent = [];
  fnTags.forEach((el,n) => {
    var content = el.innerHTML;
    fnContent.push(content);
    n = (n+1)+'';
    var key = 'fn-'+n;
    var escaped_content = content.replace(/"/g, '&#39;');
    el.innerHTML = `<sup><span id="${key}" data-hover="${escaped_content}" style="cursor:pointer">${n}</span></sup>`;
  });

  let fnList = dom.querySelector('dt-fn-list');
  if (fnList) {
    let ol = dom.createElement('ol');
    fnContent.forEach(content => {
      let el = dom.createElement('li');
      el.innerHTML = content;
      ol.appendChild(el);
    });
    fnList.appendChild(ol);
  }

}
