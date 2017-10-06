import { Template } from '../mixins/template';
import { body } from '../helpers/layout';

const T = Template('d-abstract', `
<style>
  :host {
    display: block;
    font-size: 1.2rem;
    line-height: 1.8em;
    padding-bottom: 1.5em;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 300;
    font-family: "Merriweather", georgia, serif;
  }

  ::slotted(p) {
    margin-top: 0;
    margin-bottom: 0;
    grid-column: text-start / middle-end;
  }
  ${body('d-abstract')}
</style>

<slot></slot>
`);

export class Abstract extends T(HTMLElement) {

}
