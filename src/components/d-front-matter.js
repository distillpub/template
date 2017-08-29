import ymlParse from 'js-yaml';

export function parseFrontmatter(element) {
  const scriptTag = element.querySelector('script');
  if (scriptTag) {
    const yml = scriptTag.textContent;
    const data = ymlParse.safeLoad(yml);
    return data;
  } else {
    console.error('You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.');
    return {};
  }
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
