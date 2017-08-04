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

export class Article extends T(HTMLElement) {

  constructor() {
    super();

    new MutationObserver( (mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.nodeName === 'HR') {
            console.warn('Use of <hr> tags in distill articles is discouraged!');
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
