const templateHTML = `
<style>
  dt-appendix {
    display: block;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 0;
    border-top: 1px solid rgba(0,0,0,0.1);
    color: rgba(0,0,0,0.5);
    background: rgb(250, 250, 250);
    padding-top: 36px;
    padding-bottom: 60px;
  }
  dt-appendix h3 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 18px;
    margin-bottom: 18px;
    color: rgba(0,0,0,0.65);
  }
  dt-appendix .citation {
    font-size: 11px;
    line-height: 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 18px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0, 0, 0, 0.02);
    padding: 10px 18px;
    border-radius: 3px;
    color: rgba(150, 150, 150, 1);
    overflow: hidden;
    margin-top: -12px;
  }
  dt-appendix .references {
    font-size: 12px;
    line-height: 20px;
  }
  dt-appendix a {
    color: rgba(0, 0, 0, 0.6);
  }
  dt-appendix ol,
  dt-appendix ul {
    padding-left: 24px;
  }
</style>

<div class="l-body">
</div>
`;

export default function(dom, data) {
  let el = dom.querySelector('dt-appendix')
  if (el) {
    let userHTML = el.innerHTML;
    el.innerHTML = templateHTML;
    let newHTML = "";

    // If we have some footnotes on the page, render a container for the footnote list.
    if (dom.querySelector("dt-fn")) {
      newHTML = newHTML + `<h3>Footnotes</h3><dt-fn-list></dt-fn-list>`;
    }

    // If we have any citations on the page, render a container for the bibliography.
    if (dom.querySelector("dt-cite")) {
      newHTML = newHTML + `<h3>References</h3><dt-bibliography></dt-bibliography>`;
    }

    let div = el.querySelector("div.l-body")
    div.innerHTML = userHTML + newHTML;
  }

}
