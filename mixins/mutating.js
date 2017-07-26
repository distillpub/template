

export const Mutating = (superclass) => {
  return class extends superclass {

    static get observedAttributes() {
      return ['textContent'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.warn(name, oldValue, newValue);
    }

    constructor() {
      super();

      // set up mutation observer
      const options = {childList: true, characterData: true, subtree: true};
      const observer = new MutationObserver( (mutations) => {
        observer.disconnect();
        this.renderIfPossible();
        observer.observe(this, options);
      });

      this.renderIfPossible();

      // ...and listen for changes afterwards
      observer.observe(this, options);
    }

    connectedCallback() {
      this.renderIfPossible();
    }

    // potential TODO: check if this is enough for all our usecases
    // maybe provide a custom function to tell if we have enough information to render
    renderIfPossible() {
      if (this.textContent && this.shadowRoot) { this.renderContent(); }
    };

    renderContent() {
      console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!` );
    }

  } // end class
}; // end mixin function
