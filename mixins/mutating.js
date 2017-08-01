
export const Mutating = (superclass) => {
  return class extends superclass {

    constructor() {
      super();

      // set up mutation observer
      const options = {childList: true, characterData: true, subtree: true};
      const observer = new MutationObserver( (mutations) => {
        observer.disconnect();
        this.renderIfPossible();
        observer.observe(this, options);
      });

      // ...and listen for changes
      observer.observe(this, options);
    }

    connectedCallback() {
      super.connectedCallback();

      this.renderIfPossible();
    }

    // potential TODO: check if this is enough for all our usecases
    // maybe provide a custom function to tell if we have enough information to render
    renderIfPossible() {
      if (this.textContent && this.root) {
        this.renderContent();
      }
    };

    renderContent() {
      console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!` );
    }

  } // end class
}; // end mixin function
