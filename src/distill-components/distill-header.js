import { Template } from '../mixins/template';

import logo from '../assets/distill-logo.svg';

const T = Template('distill-header', `
<style>
:host {
  box-sizing: border-box;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${1e6};
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  contain: content;
}

.content > * {
  line-height: 30px;
  font-size: 14px;
  padding: 3px 7px;
  margin: 8px 0;
}

.name {
  grid-column-end: span 8;
  font-weight: 500;
  border-radius: 3px;
  font-size: 18px;
  letter-spacing: -0.05em;
}

.content a {
  font-size: 12px;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
}
svg {
  display: none;
  background-color: hsl(0, 0%, 15%);
  padding: 8px;
  border-radius: 6px;
  width: 24px;
  position: relative;
  margin-right: 2px;
}
svg path {
  fill: white;
  stroke: rgba(255, 255, 255, 1.0);
  stroke-width: 3px;
}
.content {
  grid-column: page;
  grid-template-columns: repeat(12, 1fr);
  display: grid;
  grid-column-gap: 40px;
}
.logo {
  display: none;
  font-size: 17px;
  font-weight: 200;
}

</style>

<div class="content grid">
  <a href="/" class="logo">
    ${logo}
  </a>
  <div class='name'>
    Distill
  </div>
  <a href="/faq">Latest</a>
  <a href="/faq">About</a>
  <a href="/faq">Prize</a>
  <a href="/faq">Submit</a>
</div>
`);

// <div class="nav">
//   <a href="https://github.com/distillpub">GitHub</a>
//   <!-- https://twitter.com/distillpub -->
// </div>

export class DistillHeader extends T(HTMLElement) {

}
