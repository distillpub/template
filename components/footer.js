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
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
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
    <svg viewBox="-607 419 64 64">
      <path style="fill: none;" d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>
    </svg>
    Distill
  </a> is dedicated to clear explanations of machine learning
</div>
`;

export default function(dom, data) {
  dom.querySelector('dt-footer').innerHTML = html;
}
