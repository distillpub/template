import { Template } from '../mixins/template';
import { body } from '../helpers/layout';

const T = Template('d-abstract', `
<style>
  :host {
    display: block;
    font-size: 1.25rem;
    line-height: 1.6em;
    color: rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
  }

  ::slotted(p) {
    margin-top: 0;
    margin-bottom: 1em;
    grid-column: text-start / middle-end;
  }
  ${body('d-abstract')}
</style>

<slot></slot>
`);

export class Abstract extends T(HTMLElement) {

}
