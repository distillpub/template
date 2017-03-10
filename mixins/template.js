// import '@webcomponents/shadycss/scoping-shim';

export const Template = (name, templateString, useShadow = true) => {
  const template = document.createElement('template');
  template.innerHTML = templateString;
  // ShadyCSS.prepareTemplate(template, name);

  return (superclass) => {
    return class extends superclass {
      constructor() {
        super();
        this.clone = document.importNode(template.content, true);
        if (useShadow) {
          // ShadyCSS.applyStyle(this);
          this.shadow_ = this.attachShadow({mode: 'open'});
          this.shadow_.appendChild(clone);
        }
      }
      connectedCallback() {
        if (!useShadow) {
          this.insertBefore(this.clone, this.firstChild);
        }
      }
      get root() {
        if (useShadow) {
          return this.shadow_;
        }
        return this;
      }
      $(query) {
        return this.root.querySelector(query);
      }
      $$(query) {
        return this.root.querySelectorAll(query);
      }
    }
  }
};