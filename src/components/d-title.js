import { Template } from '../mixins/template';

const T = Template('d-title', `
<style>
  :host {
    margin-top: 64px;
    contain: content;
    display: block;
  }
  ::slotted(h1) {
    grid-column: text-start / page-end;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.3em;
    margin: 0 0 10px;
  }
  .status {
    font-size: 12px;
    color: #009688;
    opacity: 0.7;
    grid-column: kicker;
    margin-top: 19px;
  }
  .status span {
    line-height: 1;
    display: inline-block;
    padding: 7px 7px;
    border: 1px solid #80cbc4;
    border-bottom: 1px solid #80cbc4;
    border-radius: 5px;
    font-size: 9px;
    text-transform: uppercase;
  }
</style>

<div class="status"><span>Peer Reviewed</span></div>
<slot></slot>
`);

export class Title extends T(HTMLElement) {

}
