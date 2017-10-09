export function parseFrontmatter(element) {
  const scriptTag = element.querySelector('script');
  if (scriptTag) {
    const type = scriptTag.getAttribute('type');
    if (type.split('/')[1] == 'json') {
      const content = scriptTag.textContent;
      return JSON.parse(content);
    } else {
      console.error('Distill only supports JSON frontmatter tags anymore; no more YAML.');
    }
  } else {
    console.error('You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.');
  }
  return {};
}

export class FrontMatter extends HTMLElement {

  static get is() { return 'd-front-matter'; }

  constructor() {
    super();

    const options = {childList: true, characterData: true, subtree: true};
    const observer = new MutationObserver( (entries) => {
      for (const entry of entries) {
        if (entry.target.nodeName === 'SCRIPT' || entry.type === 'characterData') {
          const data = parseFrontmatter(this);
          this.notify(data);
        }
      }
    });
    observer.observe(this, options);
  }

  notify(data) {
    const options = { detail: data, bubbles: true };
    const event = new CustomEvent('onFrontMatterChanged', options);
    document.dispatchEvent(event);
  }

}
