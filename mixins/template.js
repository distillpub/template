export const Template = (name, templateString, useShadow = true) => {

  const template = document.createElement('template');
  template.innerHTML = templateString;

  if (useShadow && 'ShadyCSS' in window) {
    ShadyCSS.prepareTemplate(template, name);
  }

  return (superclass) => {
    return class extends superclass {

      static get is() { return name; }

      constructor() {
        super();

        this.clone = document.importNode(template.content, true);
        if (useShadow) {
          this.attachShadow({mode: 'open'});
          this.shadowRoot.appendChild(this.clone);
        }
      }

      connectedCallback() {
        if (useShadow) {
          if ('ShadyCSS' in window) {
            ShadyCSS.styleElement(this);
          }
        } else {
          this.insertBefore(this.clone, this.firstChild);
        }
      }

      get root() {
        if (useShadow) {
          return this.shadowRoot;
        } else {
          return this;
        }
      }

      /* TODO: Are we using these? Should we even? */
      $(query) {
        return this.root.querySelector(query);
      }

      $$(query) {
        return this.root.querySelectorAll(query);
      }
    }
  }
};
