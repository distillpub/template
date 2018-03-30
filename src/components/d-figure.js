// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

  static get readyQueue() {
    if (!Figure._readyQueue) {
      Figure._readyQueue = [];
    }
    return Figure._readyQueue;
  }

  static addToReadyQueue(figure) {
    if (Figure.readyQueue.indexOf(figure) === -1) {
      Figure.readyQueue.push(figure);
      Figure.runReadyQueue();
    }
  }

  static runReadyQueue() {
    // console.log("Checking to run readyQueue, length: " + Figure.readyQueue.length + ", scrolling: " + Figure.isScrolling);
    // if (Figure.isScrolling) return;
    // console.log("Running ready Queue");
    const figure = Figure.readyQueue
      .sort((a,b) => a._seenOnScreen - b._seenOnScreen )
      .filter((figure) => !figure._ready)
      .pop();
    if (figure) {
      figure.ready();
      requestAnimationFrame(Figure.runReadyQueue);
    }

  }

  constructor() {
    super();
    // debugger
    this._ready = false;
    this._onscreen = false;
    this._offscreen = true;
  }

  connectedCallback() {
    this.loadsWhileScrolling = this.hasAttribute('loadsWhileScrolling');
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
      // if (!('IntersectionObserver' in window)) {
      //   throw new Error('no interscetionobbserver!');
      // }
      const viewportHeight = window.innerHeight;
      const margin = Math.floor(2 * viewportHeight);
      const options = {rootMargin: margin + 'px 0px ' + margin + 'px 0px', threshold: 0.01};
      const callback = Figure.didObserveMarginIntersection;
      const observer = new IntersectionObserver(callback, options);
      Figure._marginObserver = observer;
    }
    return Figure._marginObserver;
  }

  static didObserveMarginIntersection(entries) {
    for (const entry of entries) {
      const figure = entry.target;
      if (entry.isIntersecting && !figure._ready) {
        Figure.addToReadyQueue(figure);
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
        figure._seenOnScreen = new Date();
        // if (!figure._ready) { figure.ready(); }
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
    // debugger
    if (eventName === 'ready') {
      if (Figure.readyQueue.indexOf(this) !== -1) {
        this._ready = false;
        Figure.runReadyQueue();
      }
    }
    if (eventName === 'onscreen') {
      this.onscreen();
    }
  }

  // Custom Events

  ready() {
    // debugger
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

if (typeof window !== 'undefined') {

  Figure.isScrolling = false;
  let timeout;
  const resetTimer = () => {
    Figure.isScrolling = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      Figure.isScrolling = false;
      Figure.runReadyQueue();
    }, 500);
  };
  window.addEventListener('scroll', resetTimer, true);

}
