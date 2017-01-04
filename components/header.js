const html = `
<style>
dt-header {
  display: block;
  position: relative;
  height: 60px;
  background-color: #fcfcfc;
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
    <svg viewBox="-607 419 64 64">
    <path style="fill: none; stroke: black;stroke-width: 2px;" d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>
    </svg>
    Distill
  </a>
  <div class="nav">
  </div>
</div>
`

export default function(dom, data) {
  dom.querySelector('dt-header').innerHTML = html;
}
