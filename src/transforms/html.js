export default function(dom) {

  const head = dom.querySelector('head');

  // set language to 'en'
  if (!dom.querySelector('html').getAttribute('lang')) {
    dom.querySelector('html').setAttribute('lang', 'en');
  }

  // set charset to 'utf-8'
  if (!dom.querySelector('meta[charset]')) {
    const meta = dom.createElement('meta');
    meta.setAttribute('charset', 'utf-8');
    head.appendChild(meta);
  }

  // set viewport
  if (!dom.querySelector('meta[name=viewport]')) {
    const meta = dom.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1');
    head.appendChild(meta);
  }
}
