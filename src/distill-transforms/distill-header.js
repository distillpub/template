export default function(dom) {
  const headerTag = dom.querySelector('distill-header');
  if (!headerTag) {
    const header = dom.createElement('distill-header');
    const body = dom.querySelector('body');
    body.insertBefore(header, body.firstChild);
  }
}
