import { Template } from '../mixins/template';
import { body } from '../helpers/layout';

const T = Template('d-title', `
<style>

:host {
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-bottom: 64px;
}


::slotted(h1) {
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 0;
  line-height: 1.3;
  font-size: 32px;
  font-weight: 700;
}

@media screen and (min-width: 768px), print {
  ::slotted(h1) {
    font-size: 42px;
    padding-bottom: 32px;
  }
}
@media(min-width: 1024px) {
  ::slotted(h1) {
    padding-top: 64px;
    padding-bottom: 64px;
    font-size: 48px;
  }
}
@media(min-width: 1280px) {
  ::slotted(h1) {
    padding-top: 96px;
    padding-bottom: 64px;
    font-size: 56px;
  }
}

d-byline {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

${body('::slotted(h1), ::slotted(h2)')}

</style>

<slot></slot>
`);

export class Title extends T(HTMLElement) {

}
