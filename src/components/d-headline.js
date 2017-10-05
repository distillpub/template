import { Template } from '../mixins/template';
import { body } from '../helpers/layout';

const T = Template('d-headline', `
<style>
  :host {
    margin-top: 64px;
    contain: content;
    display: block;
  }
  .status {
    grid-column: kicker;
    font-size: 12px;
    margin-top: 14px;
    color: #009688;
    opacity: 0.7;
  }
  .status span {
    display: inline-block;
    padding: 4px 0;
    border-top: 1px solid #80cbc4;
    border-bottom: 1px solid #80cbc4;
  }
  ::slotted(h1) {
    grid-column: text-start / page-end;
    font-size: 48px;
    font-weight: 700;
    line-height: 1.3em;
    margin: 0 0 10px;
  }
  ${body('d-headline')}
</style>
<div class="status kicker"><span>Peer Reviewed</span></div>
<slot></slot>
`);

export class Headline extends T(HTMLElement) {

}
