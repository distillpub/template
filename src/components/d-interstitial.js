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

import { Template } from '../mixins/template';

// This overlay is not secure.
// It is only meant as a social deterrent.

const productionHostname = 'distill.pub';
const T = Template('d-interstitial', `
<style>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;

  opacity: 1;
  visibility: visible;

  display: flex;
  flex-flow: column;
  justify-content: center;
  z-index: 2147483647 /* MaxInt32 */

}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  padding: 2em;
}

h1 {
  text-decoration: underline;
  text-decoration-color: hsl(0,100%,40%);
  -webkit-text-decoration-color: hsl(0,100%,40%);
  margin-bottom: 1em;
  line-height: 1.5em;
}

input[type="password"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: none;
  -moz-border-radius: none;
  -ms-border-radius: none;
  -o-border-radius: none;
  border-radius: none;
  outline: none;

  font-size: 18px;
  background: none;
  width: 25%;
  padding: 10px;
  border: none;
  border-bottom: solid 2px #999;
  transition: border .3s;
}

input[type="password"]:focus {
  border-bottom: solid 2px #333;
}

input[type="password"].wrong {
  border-bottom: solid 2px hsl(0,100%,40%);
}

p small {
  color: #888;
}

.logo {
  position: relative;
  font-size: 1.5em;
  margin-bottom: 3em;
}

.logo svg {
  width: 36px;
  position: relative;
  top: 6px;
  margin-right: 2px;
}

.logo svg path {
  fill: none;
  stroke: black;
  stroke-width: 2px;
}

</style>

<div class="overlay">
  <div class="container">
    <h1>This article is in review.</h1>
    <p>Do not share this URL or the contents of this article. Thank you!</p>
    <input id="interstitial-password-input" type="password" name="password" autofocus/>
    <p><small>Enter the password we shared with you as part of the review process to view the article.</small></p>
  </div>
</div>
`);

export class Interstitial extends T(HTMLElement) {

  connectedCallback() {
    if (this.shouldRemoveSelf()) {
      this.parentElement.removeChild(this);
    } else {
      const passwordInput = this.root.querySelector('#interstitial-password-input');
      passwordInput.oninput = (event) => this.passwordChanged(event);
    }
  }

  passwordChanged(event) {
    const entered = event.target.value;
    if (entered === this.password) {
      console.log('Correct password entered.');
      this.parentElement.removeChild(this);
      if (typeof(Storage) !== 'undefined') {
        console.log('Saved that correct password was entered.');
        localStorage.setItem(this.localStorageIdentifier(), 'true');
      }
    }
  }

  shouldRemoveSelf() {
    // should never be visible in production
    if (window && window.location.hostname === productionHostname) {
      console.warn('Interstitial found on production, hiding it.');
      return true
    }
    // should only have to enter password once
    if (typeof(Storage) !== 'undefined') {
      if (localStorage.getItem(this.localStorageIdentifier()) === 'true') {
        console.log('Loaded that correct password was entered before; skipping interstitial.');
        return true;
      }
    }
    // otherwise, leave visible
    return false;
  }

  localStorageIdentifier() {
    const prefix = 'distill-drafts'
    const suffix = 'interstitial-password-correct';
    return prefix + (window ? window.location.pathname : '-') + suffix
  }

}
