export default function(dom) {
  const footerTag = dom.querySelector('distill-footer');
  if(!footerTag) {
    const footer = dom.createElement('distill-footer');
    const body = dom.querySelector('body');
    body.appendChild(footer);
  }
}
