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

export function addPolyfill(polyfill, polyfillLoadedCallback) {
  console.debug('Runlevel 0: Polyfill required: ' + polyfill.name);
  const script = document.createElement('script');
  script.src = polyfill.url;
  script.async = false;
  if (polyfillLoadedCallback) {
    script.onload = function() { polyfillLoadedCallback(polyfill); };
  }
  script.onerror = function() {
    new Error('Runlevel 0: Polyfills failed to load script ' + polyfill.name);
  };
  document.head.appendChild(script);
}

export const polyfills = [
  {
    name: 'WebComponents',
    support: function() {
      return 'customElements' in window &&
             'attachShadow' in Element.prototype &&
             'getRootNode' in Element.prototype &&
             'content' in document.createElement('template') &&
             'Promise' in window &&
             'from' in Array;
    },
    url: 'https://distill.pub/third-party/polyfills/webcomponents-lite.js'
  }, {
    name: 'IntersectionObserver',
    support: function() {
      return 'IntersectionObserver' in window &&
             'IntersectionObserverEntry' in window;
    },
    url: 'https://distill.pub/third-party/polyfills/intersection-observer.js'
  },
];

export class Polyfills {

  static browserSupportsAllFeatures() {
    return polyfills.every((poly) => poly.support());
  }

  static load(callback) {
    // Define an intermediate callback that checks if all is loaded.
    const polyfillLoaded = function(polyfill) {
      polyfill.loaded = true;
      console.debug('Runlevel 0: Polyfill has finished loading: ' + polyfill.name);
      // console.debug(window[polyfill.name]);
      if (Polyfills.neededPolyfills.every((poly) => poly.loaded)) {
        console.debug('Runlevel 0: All required polyfills have finished loading.');
        console.debug('Runlevel 0->1.');
        window.distillRunlevel = 1;
        callback();
      }
    };
    // Add polyfill script tags
    for (const polyfill of Polyfills.neededPolyfills) {
      addPolyfill(polyfill, polyfillLoaded);
    }
  }

  static get neededPolyfills() {
    if (!Polyfills._neededPolyfills) {
      Polyfills._neededPolyfills = polyfills.filter((poly) => !poly.support());
    }
    return Polyfills._neededPolyfills;
  }
}
