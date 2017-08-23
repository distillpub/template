// Figure
//
// d-figure provides a state-machine of visibility events:
//
//                         scroll out of view
//                         +----------------+
//   *do work here*        |                |
// +----------------+    +-+---------+    +-v---------+
// | ready          +----> onscreen  |    | offscreen |
// +----------------+    +---------^-+    +---------+-+
//                                 |                |
//                                 +----------------+
//                                  scroll into view
//

export class Figure extends HTMLElement {

  static get is() { return 'd-figure'; }

  constructor() {
    super();
    this._ready = false;
    this._onscreen = false;
    this._offscreen = true;
  }

  connectedCallback() {
    Figure.marginObserver.observe(this);
    Figure.directObserver.observe(this);
  }

  disconnectedCallback() {
    Figure.marginObserver.unobserve(this);
    Figure.directObserver.unobserve(this);
  }

  // We use two separate observers:
  // One with an extra 1000px margin to warn if the viewpoint gets close,
  // And one for the actual on/off screen events

  static get marginObserver() {
    if (!Figure._marginObserver) {
      const viewportHeight = window.innerHeight;
      const margin = Math.floor(2 * viewportHeight);
      Figure._marginObserver = new IntersectionObserver(
        Figure.didObserveMarginIntersection, {
          rootMargin: margin + 'px 0px ' + margin + 'px 0px', threshold: 0.01,
        });
    }
    return Figure._marginObserver;
  }

  static didObserveMarginIntersection(entries) {
    for (const entry of entries) {
      const figure = entry.target;
      if (entry.isIntersecting && !figure._ready) {
        figure.ready();
      }
    }
  }

  static get directObserver() {
    if (!Figure._directObserver) {
      Figure._directObserver = new IntersectionObserver(
        Figure.didObserveDirectIntersection, {
          rootMargin: '0px', threshold: [0, 1.0],
        }
      );
    }
    return Figure._directObserver;
  }

  static didObserveDirectIntersection(entries) {
    for (const entry of entries) {
      const figure = entry.target;
      if (entry.isIntersecting) {
        if (!figure._ready) { figure.ready(); }
        if (figure._offscreen) { figure.onscreen(); }
      } else {
        if (figure._onscreen) { figure.offscreen(); }
      }
    }
  }

  // Notify listeners that registered late, too:

  addEventListener(eventName, callback) {
    super.addEventListener(eventName, callback);
    // if we had already dispatched something while presumingly no one was listening, we do so again
    if (this._ready && eventName === 'ready') {
      this.ready();
    }
    if (this._onscreen && eventName === 'onscreen') {
      this.onscreen();
    }
  }

  // Custom Events

  ready() {
    this._ready = true;
    Figure.marginObserver.unobserve(this);
    const event = new CustomEvent('ready');
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
