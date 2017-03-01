import {Template} from './mixins/template';

// import logo from "./distill-logo.svg";
var logo = "";

const T = Template('dt-header', `
<style>
:host {
  display: block;
  position: relative;
  height: 60px;
  background-color: hsl(200, 60%, 15%);
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
.content {
  height: 70px;
}
a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 22px 0;
}
a:hover {
  color: rgba(255, 255, 255, 1);
}
svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
@media(min-width: 1080px) {
  :host {
    height: 70px;
  }
  a {
    height: 70px;
    line-height: 70px;
    padding: 28px 0;
  }
  .logo {
  }
}
svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
.logo {
  font-size: 17px;
  font-weight: 200;
}
.nav {
  float: right;
  font-weight: 300;
}
.nav a {
  font-size: 12px;
  margin-left: 24px;
  text-transform: uppercase;
}
</style>

<div class="content l-page">
  <a href="/" class="logo">
    ${logo}
    Distill
  </a>
  <div class="nav">
    <a href="/faq">About</a>
    <a href="https://github.com/distillpub">GitHub</a>
    <!-- https://twitter.com/distillpub -->
  </div>
</div>
`);

export default class DTHeader extends T(HTMLElement) {
  static get is() {
    return 'dt-header';
  }
}

customElements.define(DTHeader.is, DTHeader);
