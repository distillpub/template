import { Template } from '../mixins/template';
import { body } from '../helpers/layout';

const T = Template('d-appendix', `
<style>

d-appendix {
  contain: content;

  font-size: 13px;
  line-height: 1.7em;
  margin-bottom: 0;
  border-top: 1px solid rgba(0,0,0,0.1);
  color: rgba(0,0,0,0.5);
  padding-top: 36px;
  padding-bottom: 48px;
}

d-appendix h3 {
  font-size: 15px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 0;
  color: rgba(0,0,0,0.65);
  line-height: 1em;
}

d-appendix a {
  color: rgba(0, 0, 0, 0.6);
}

d-appendix > * {
  grid-column: margin-left / body;
}

</style>

`, false);

export class Appendix extends T(HTMLElement) {

}
