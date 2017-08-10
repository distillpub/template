import { Template } from '../mixins/template';
import { Controller } from '../controller';

const T = Template('d-article', `
<style></style>
`, false);

// export function addInferableTags(dom, frontMatter) {
//   const title = frontMatter.title;
//   if (title) {
//     const titleTag = document.querySelector()
//
//   }
// }

const isOnlyWhitespace = /^\s*$/;

export class Article extends T(HTMLElement) {

  constructor() {
    super();

    new MutationObserver( (mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          switch (addedNode.nodeName) {
          case 'HR':
            console.warn('Use of <hr> tags in distill articles is discouraged!');
            break;
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
    for (const [functionName, callback] of Object.entries(Controller.listeners)) {
      if (typeof callback === 'function') {
        document.addEventListener(functionName, callback);
      } else {
        console.error('Controller listeners need to be functions!');
      }
    }
  }

}
