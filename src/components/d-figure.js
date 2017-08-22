`Figure

d-figure provides a state-machine of visibility events:

                                    scroll out of view
                                    +----------------+
              *do work here*        |                |
+------+    +----------------+    +-+---------+    +-v---------+
| init +----> almostonscreen +----> onscreen  |    | offscreen |
+------+    +----------------+    +---------^-+    +---------+-+
                                            |                |
                                            +----------------+
                                             scroll into view

TODO:
* default styling
* get rid of init state?
* shadow dom?
* resizing/default size?
* offer centerscreen event?
* polyfills

`

const intersectionMargin = 1000;

export class Figure extends HTMLElement {

  static get is() { return 'd-figure'; }

  constructor() {
    super();

    // keep track of communicated state
    this._init = false;
    this._onscreen = false;
    this._offscreen = true;

    // we use two separate observers:
    // one with an extra 1000px margin to warn if the viewpoint gets close,
    // and one for the actual on/off screen events
    this._marginObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !this._almostonscreen) {
          this.almostonscreen();
          this._marginObserver.disconnect();
        }
      }
    }, {
      root: null, // listen on entire viewport
      rootMargin: intersectionMargin + 'px 0px ' + intersectionMargin + 'px 0px',
      threshold: 1.0,
    });
    this._directObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!this._almostonscreen) { this.almostonscreen(); }
          if (this._offscreen) { this.onscreen(); }
        } else {
          if (this._onscreen) { this.offscreen(); }
        }
      }
    }, {
      root: null, // listen on entire viewport
      rootMargin: '0px',
      threshold: [0, 1.0],
    });

  }

  connectedCallback() {
    this._marginObserver.observe(this);
    this._directObserver.observe(this);
    this.init();
  }


  /* Override addEventListener
   * We want to notify elements that register late as well.
   */

  addEventListener(eventName, callback) {
    super.addEventListener(eventName, callback);
    // if we had already dispatched something while presumingly no one was listening, we do so again
    if (this._init && eventName === 'init') {
      this.init();
    }
    if (this._almostonscreen && eventName === 'almostonscreen') {
      this.almostonscreen();
    }
    if (this._onscreen && eventName === 'onscreen') {
      this.onscreen();
    }
  }


  /* Custom Events */

  init() {
    this._init = true;
    const event = new CustomEvent('init');
    this.dispatchEvent(event);
  }

  almostonscreen() {
    this._almostonscreen = true;
    const event = new CustomEvent('almostonscreen');
    this.dispatchEvent(event);
  }

  onscreen() {
    this._onscreen = true;
    this._offscreen = false;
    const event = new CustomEvent('onscreen');
    this.dispatchEvent(event);
  }

  offscreen() {
    this._onscreen = false;
    this._offscreen = true;
    const event = new CustomEvent('offscreen');
    this.dispatchEvent(event);
  }

}
