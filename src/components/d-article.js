import { Template } from '../mixins/template';
import { Controller } from '../controller';

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

  connectedCallback() {
    document.onreadystatechange = function () {
      console.log("onreadystatechange:");
      console.log(document.readyState);
    };
    console.info('Article tag connected, we can now listen to controller events.');
    console.info('Runlevel 3->4.');
    for (const [functionName, callback] of Object.entries(Controller.listeners)) {
      if (typeof callback === 'function') {
        document.addEventListener(functionName, callback);
      } else {
        console.error('Controller listeners need to be functions!');
      }
    }
  }

}
