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

export const Mutating = (superclass) => {
  return class extends superclass {

    constructor() {
      super();

      // set up mutation observer
      const options = {childList: true, characterData: true, subtree: true};
      const observer = new MutationObserver( () => {
        observer.disconnect();
        this.renderIfPossible();
        observer.observe(this, options);
      });

      // ...and listen for changes
      observer.observe(this, options);
    }

    connectedCallback() {
      super.connectedCallback();

      this.renderIfPossible();
    }

    // potential TODO: check if this is enough for all our usecases
    // maybe provide a custom function to tell if we have enough information to render
    renderIfPossible() {
      if (this.textContent && this.root) {
        this.renderContent();
      }
    }

    renderContent() {
      console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!` );
    }

  }; // end class
}; // end mixin function
