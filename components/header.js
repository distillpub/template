import logo from "./distill-logo.svg";

const html = `
<style>
dt-header {
  display: block;
  position: relative;
  height: 60px;
  background-color: none;
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
}
dt-header .content {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  height: 60px;
}
dt-header a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
}
dt-header svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: -2px;
}
dt-header svg path {
  fill: none;
  stroke: black;
  stroke-width: 1;
  stroke-linejoin: round;
}
dt-header .logo {
  font-size: 16px;
  font-weight: 300;
}
dt-header .nav {
  float: right;
}
dt-header .nav a {
  font-size: 14px;
}
</style>

<div class="content l-page">
  <a href="/" class="logo">
    ${logo}
    Distill
  </a>
  <div class="nav">
  </div>
</div>
`

export default function(dom, data) {
  let el = dom.querySelector("dt-header");
  if(el) {
    el.innerHTML = html;
  } else {
    let header = dom.createElement("dt-header");
    header.innerHTML = html;
    let b = dom.querySelector("body");
    b.insertBefore(header, b.firstChild);
  }
}
