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
  loaderTag.src = 'http://localhost:8888/dist/template.v2.js';
  document.head.insertBefore(loaderTag, document.head.firstChild);
});
`;

export default function render(dom) {
  // pull out template script tag
  const templateTag = dom.querySelector('script[src*="template.v2.js"]');
  templateTag.parentNode.removeChild(templateTag);

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
