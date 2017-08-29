import { Template } from '../mixins/template';

const T = Template('d-acknowledgements', `
<style>

:host {
  contain: content;
}

::slotted(h3) {
  font-size: 15px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 0;
  color: rgba(0,0,0,0.65);
  line-height: 1em;
}

::slotted(*) a {
  color: rgba(0, 0, 0, 0.6);
}

</style>

<slot></slot>
`);

export class Acknowledgements extends T(HTMLElement) {

}
