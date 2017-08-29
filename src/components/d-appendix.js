import { Template } from '../mixins/template';
import { body } from '../helpers/layout';

const T = Template('d-appendix', `
<style>

:host {
  box-sizing: border-box;
  display: block;
  width: 100%;

  font-size: 13px;
  line-height: 1.7em;
  margin-bottom: 0;
  border-top: 1px solid rgba(0,0,0,0.1);
  color: rgba(0,0,0,0.5);
  padding-top: 36px;
  padding-bottom: 48px;

  contain: content;
}

${body('.content')}

</style>

<div class='content'>
<slot></slot>
</div>
`, true);

export class Appendix extends T(HTMLElement) {

}
