const html = `
<style>
  dt-banner {
    background: #FFF59D;
    display: block;
    text-align: center;
    color: black;
    height: 70px;
    line-height: 70px;
  }
</style>
<div>This article is a draft, awaiting review for publication in Distill</div>
`;

export default function(dom, data) {
  let banner = dom.createElement("dt-banner");
  banner.innerHTML = html;
  let b = dom.querySelector("body");
  b.insertBefore(banner, b.firstChild);
  banner.addEventListener("click", function() {
    banner.style.display = "none";
  });
}
