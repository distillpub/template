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

const webcomponentPath = 'https://distill.pub/third-party/polyfills/webcomponents-lite.js';
const intersectionObserverPath = 'https://distill.pub/third-party/polyfills/intersection-observer.js';

// const template = `
// if ('IntersectionObserver' in window &&
//   'IntersectionObserverEntry' in window &&
//   'intersectionRatio' in IntersectionObserverEntry.prototype) {
//     // Platform supports IntersectionObserver natively! :-)
//     if (!('isIntersecting' in IntersectionObserverEntry.prototype)) {
//       Object.defineProperty(IntersectionObserverEntry.prototype,
//         'isIntersecting', {
//         get: function () {
//           return this.intersectionRatio > 0;
//         }
//       });
//     }
// } else {
//   // Platform does not support webcomponents--loading polyfills synchronously.
//   const scriptTag = document.createElement('script');
//   scriptTag.src = '${intersectionObserverPath}';
//   scriptTag.async = false;
//   document.currentScript.parentNode.insertBefore(scriptTag, document.currentScript.nextSibling);
// }
//
// if ('registerElement' in document &&
//     'import' in document.createElement('link') &&
//     'content' in document.createElement('template')) {
//   // Platform supports webcomponents natively! :-)
// } else {
//   // Platform does not support webcomponents--loading polyfills synchronously.
//   const scriptTag = document.createElement('script');
//   scriptTag.src = '${webcomponentPath}';
//   scriptTag.async = false;
//   document.currentScript.parentNode.insertBefore(scriptTag, document.currentScript.nextSibling);
// }
//
//
// `;


const addBackIn = `
window.addEventListener('WebComponentsReady', function() {
  console.warn('WebComponentsReady');
  const loaderTag = document.createElement('script');
  loaderTag.src = 'https://distill.pub/template.v2.js';
  document.head.insertBefore(loaderTag, document.head.firstChild);
});
`;

export default function render(dom) {
  // pull out template script tag
  const templateTag = dom.querySelector('script[src*="template.v2.js"]');
  if (templateTag) {
    templateTag.parentNode.removeChild(templateTag);
  } else {
    console.debug('FYI: Did not find template tag when trying to remove it. You may not have added it. Be aware that our polyfills will add it.')
  }

  // add loader
  const loaderTag = dom.createElement('script');
  loaderTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.17/webcomponents-loader.js';
  dom.head.insertBefore(loaderTag, dom.head.firstChild);

  // add loader event listener to add tempalrte back in
  const addTag = dom.createElement('script');
  addTag.innerHTML = addBackIn;
  dom.head.insertBefore(addTag, dom.head.firstChild);


  // create polyfill script tag
  // const polyfillScriptTag = dom.createElement('script');
  // polyfillScriptTag.innerHTML = template;
  // polyfillScriptTag.id = 'polyfills';

  // insert at appropriate position--before any other script tag
  // const firstScriptTag = dom.head.querySelector('script');
  // dom.head.insertBefore(polyfillScriptTag, firstScriptTag);
}
