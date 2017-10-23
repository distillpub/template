/*
  Try to only reorder things that MAY be user defined.
  Try to use templates etc to define the order of our own tags.
*/

export default function render(dom) {
  const head = dom.head;

  const metaIE = head.querySelector('meta[http-equiv]');
  head.insertBefore(metaIE, head.firstChild);

  const metaViewport = head.querySelector('meta[name=viewport]');
  head.insertBefore(metaViewport, head.firstChild);

  const metaCharset = head.querySelector('meta[charset]');
  head.insertBefore(metaCharset, head.firstChild);
}
