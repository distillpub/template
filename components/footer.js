import logo from "./distill-logo.svg";

const html = `
<style>
dt-footer {
  display: block;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.6);
}
dt-footer .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: -2px;
}
dt-footer .logo svg path {
  stroke: rgba(255, 255, 255, 0.8)!important;
  stroke-width: 3px!important;
}
dt-footer .logo {
  font-size: 16px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}
</style>

<div class="l-body">
  <a href="/" class="logo">
    ${logo}
    Distill
  </a> is dedicated to clear explanations of machine learning
</div>
`;

export default function(dom, data) {
  dom.querySelector('dt-footer').innerHTML = html;
}
