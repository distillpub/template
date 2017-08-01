import { Template } from '../mixins/template';
import { Controller } from './controller';

const T = Template('d-article', `
<style></style>
`, false);



export class Article extends T(HTMLElement) {

  // constructor() {
  //   super();
  // }

  connectedCallback() {
    for (const [functionName, callback] of Object.entries(Controller.listeners)) {
      if (typeof callback === 'function') {
        document.addEventListener(functionName, callback);
      } else {
        console.error('Controller listeners need to be functions!')
      }
    }
  }

}
