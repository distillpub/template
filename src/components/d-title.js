import { Template } from '../mixins/template';
import { page } from '../helpers/layout';

const T = Template('d-title', `
<style>

:host {
  box-sizing: border-box;
  display: block;
  width: 100%;
}
::slotted(h1) {
  padding-top: 16px;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 12px;
  line-height: 1.15;
  font-size: 32px;
  font-weight: 700;
}

::slotted(h2) {
  border-bottom: none !important;
  font-size: 26px !important;
  font-weight: 300 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  line-height: 1.5em !important;
  margin-top: 0 !important;
  margin-bottom: 18px !important;
}

@media screen and (min-width: 768px), print {
  ::slotted(h1) {
    font-size: 42px;
  }
}
@media(min-width: 1024px) {
  ::slotted(h1) {
    padding-top: 64px;
    font-size: 42px;
  }
}
@media(min-width: 1280px) {
  ::slotted(h1) {
    padding-top: 96px;
  }
}

d-byline {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

${page('::slotted(h1), ::slotted(h2)')}

</style>

<slot></slot>
`);

export class Title extends T(HTMLElement) {

}
