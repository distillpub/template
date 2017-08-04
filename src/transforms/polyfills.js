const webcomponentPath = '../dist/webcomponents-lite.js';

const template = `
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
  const head = dom.querySelector('head');
  const firstScriptTag = dom.querySelector('script');
  if (firstScriptTag) {
    head.insertBefore(polyfillScriptTag, firstScriptTag);
  } else {
    head.appendChild(polyfillScriptTag);
  }
}
