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

import { Template } from '../mixins/template.js';

const T = Template('d-content-ref', `
<style>

d-math[block] {
  display: block;
}

:host {

}


span {
  color: hsla(206, 90%, 20%, 0.7);
  cursor: default;
}

.content-ref-container {
  padding: 10px;
}

</style>

<d-hover-box>
  <div class="content-ref-container">
    <slot id="slot"></slot>
  </div>
</d-hover-box>

<span id="fn-" data-hover-ref=""></span>

`);


export class ContentRef extends T(HTMLElement) {

  connectedCallback() {
      var ref = this.getAttribute('ref')
      ref = document.getElementById(ref);
      ref = ref.innerHTML
      this.innerHTML = ref
      this.hoverBox = this.root.querySelector('d-hover-box');
      const val = this.getAttribute('val')

      window.customElements.whenDefined('d-hover-box').then(() => {
        this.hoverBox.listen(this);
      }
      );
      const span = this.root.querySelector('#fn-');
      span.textContent = val;

      }
}  