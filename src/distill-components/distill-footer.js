import { Template } from '../mixins/template';
import logo from '../assets/distill-logo.svg';

const T = Template('distill-footer', `
<style>

:host {
  display: block;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;

  contain: content;
}

.logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.container {
  grid-column: left / text;
}
</style>

<div class='container'>
<a href="/" class="logo">
  ${logo}
  Distill
</a> is dedicated to clear explanations of machine learning
</div>
`);

export class DistillFooter extends T(HTMLElement) {

}
