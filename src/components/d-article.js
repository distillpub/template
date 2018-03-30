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

// import { Template } from '../mixins/template';
// import { Controller } from '../controller';

const isOnlyWhitespace = /^\s*$/;

export class Article extends HTMLElement {
  static get is() { return 'd-article'; }

  constructor() {
    super();

    new MutationObserver( (mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          switch (addedNode.nodeName) {
          case '#text': { // usually text nodes are only linebreaks.
            const text = addedNode.nodeValue;
            if (!isOnlyWhitespace.test(text)) {
              console.warn('Use of unwrapped text in distill articles is discouraged as it breaks layout! Please wrap any text in a <span> or <p> tag. We found the following text: ' + text);
              const wrapper = document.createElement('span');
              wrapper.innerHTML = addedNode.nodeValue;
              addedNode.parentNode.insertBefore(wrapper, addedNode);
              addedNode.parentNode.removeChild(addedNode);
            }
          } break;
          }
        }
      }
    }).observe(this, {childList: true});
  }

}
