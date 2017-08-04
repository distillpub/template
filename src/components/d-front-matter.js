import ymlParse from 'js-yaml';

export class FrontMatter extends HTMLElement {

  static get is() { return 'd-front-matter'; }

  constructor() {
    super();

    const options = {childList: true, characterData: true, subtree: true};
    const observer = new MutationObserver( () => {
      const data = this.parse();
      this.notify(data);
    });
    observer.observe(this, options);
  }

  parse(){
    const scriptTag = this.querySelector('script');
    if (scriptTag) {
      const yml = scriptTag.textContent;
      const data = ymlParse.safeLoad(yml);
      return data;
    } else {
      console.error('You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.');
      return {};
    }
  }

  notify(data) {
    const options = { detail: data, bubbles: true };
    const event = new CustomEvent('onFrontMatterChanged', options);
    document.dispatchEvent(event);
  }

}
