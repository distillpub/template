const webcomponentPath = 'https://distill.pub/third-party/polyfills/webcomponents-lite.js';
const intersectionObserverPath = 'https://distill.pub/third-party/polyfills/intersection-observer.js';

const template = `
if ('IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in IntersectionObserverEntry.prototype) {
    // Platform supports IntersectionObserver natively! :-)
    if (!('isIntersecting' in IntersectionObserverEntry.prototype)) {
      Object.defineProperty(IntersectionObserverEntry.prototype,
        'isIntersecting', {
        get: function () {
          return this.intersectionRatio > 0;
        }
      });
    }
} else {
  // Platform does not support webcomponents--loading polyfills synchronously.
  const scriptTag = document.createElement('script');
  scriptTag.src = '${intersectionObserverPath}';
  scriptTag.async = false;
  document.currentScript.parentNode.insertBefore(scriptTag, document.currentScript.nextSibling);
}

if ('registerElement' in document &&
    'import' in document.createElement('link') &&
    'content' in document.createElement('template')) {
  // Platform supports webcomponents natively! :-)
} else {
  // Platform does not support webcomponents--loading polyfills synchronously.
  const scriptTag = document.createElement('script');
  scriptTag.src = '${webcomponentPath}';
  scriptTag.async = false;
  document.currentScript.parentNode.insertBefore(scriptTag, document.currentScript.nextSibling);
}
`;

export default function render(dom) {
  // create polyfill script tag
  const polyfillScriptTag = dom.createElement('script');
  polyfillScriptTag.innerHTML = template;
  polyfillScriptTag.id = 'polyfills';

  // insert at appropriate position--before any other script tag
  dom.head.insertBefore(polyfillScriptTag, dom.head.firstChild);
}
