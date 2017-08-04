import logo from "./distill-logo.svg";

let html = `
<style>
dt-footer {
  display: block;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(200, 60%, 15%);
  text-align: center;
}
dt-footer .logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
dt-footer .logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
dt-footer .logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}
</style>

<div class="l-screen-inset">
  <a href="/" class="logo">
    ${logo}
    Distill
  </a> is dedicated to clear explanations of machine learning
</div>
`;

export default function(dom, data) {
  let el = dom.querySelector("dt-footer");
  if(el) {
    el.innerHTML = html;
  } else {
    let footer = dom.createElement("dt-footer");
    footer.innerHTML = html;
    let b = dom.querySelector("body");
    b.appendChild(footer);
  }
}
