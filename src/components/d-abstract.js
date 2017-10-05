import { Template } from '../mixins/template';
import { body } from '../helpers/layout';

const T = Template('d-abstract', `
<style>
  :host {
    display: block;
    font-size: 28px;
    line-height: 1.7em;
    margin-bottom: 1.5em;
  }

  ::slotted(p) {
    margin-top: 0;
    margin-bottom: 0;
    grid-column: text-start / page-end;
  }
  ${body('d-abstract')}
</style>

<slot></slot>
`);

export class Abstract extends T(HTMLElement) {

}
