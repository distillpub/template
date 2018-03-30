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

import { Template } from '../mixins/template';
import { scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { drag } from 'd3-drag';
import { select, event as currentEvent } from 'd3-selection';

const T = Template('d-slider', `
<style>
  :host {
    position: relative;
    display: inline-block;
  }

  :host(:focus) {
    outline: none;
  }

  .background {
    padding: 9px 0;
    color: white;
    position: relative;
  }

  .track {
    height: 3px;
    width: 100%;
    border-radius: 2px;
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  .track-fill {
    position: absolute;
    top: 9px;
    height: 3px;
    border-radius: 4px;
    background-color: hsl(24, 100%, 50%);
  }

  .knob-container {
    position: absolute;
    top: 10px;
  }

  .knob {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsl(24, 100%, 50%);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }
  .mousedown .knob {
    transform: scale(1.5);
  }

  .knob-highlight {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsla(0, 0%, 0%, 0.1);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }

  .focus .knob-highlight {
    transform: scale(2);
  }

  .ticks {
    position: absolute;
    top: 16px;
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .ticks .tick {
    position: absolute;
    height: 100%;
    border-left: 1px solid hsla(0, 0%, 0%, 0.2);
  }

</style>

  <div class='background'>
    <div class='track'></div>
    <div class='track-fill'></div>
    <div class='knob-container'>
      <div class='knob-highlight'></div>
      <div class='knob'></div>
    </div>
    <div class='ticks'></div>
  </div>
`);

// ARIA
// If the slider has a visible label, it is referenced by aria-labelledby on the slider element. Otherwise, the slider element has a label provided by aria-label.
// If the slider is vertically oriented, it has aria-orientation set to vertical. The default value of aria-orientation for a slider is horizontal.

const keyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36
};

export class Slider extends T(HTMLElement) {


  connectedCallback() {
    this.connected = true;
    this.setAttribute('role', 'slider');
    // Makes the element tab-able.
    if (!this.hasAttribute('tabindex')) { this.setAttribute('tabindex', 0); }

    // Keeps track of keyboard vs. mouse interactions for focus rings
    this.mouseEvent = false;

    // Handles to shadow DOM elements
    this.knob = this.root.querySelector('.knob-container');
    this.background = this.root.querySelector('.background');
    this.trackFill = this.root.querySelector('.track-fill');
    this.track = this.root.querySelector('.track');

    // Default values for attributes
    this.min = this.min ? this.min : 0;
    this.max = this.max ? this.max : 100;
    this.scale = scaleLinear().domain([this.min, this.max]).range([0, 1]).clamp(true);

    this.origin = this.origin !== undefined ? this.origin : this.min;
    this.step = this.step ? this.step : 1;
    this.update(this.value ? this.value : 0);

    this.ticks = this.ticks ? this.ticks : false;
    this.renderTicks();

    this.drag = drag()
      .container(this.background)
      .on('start', () => {
        this.mouseEvent = true;
        this.background.classList.add('mousedown');
        this.changeValue = this.value;
        this.dragUpdate();
      })
      .on('drag', () => {
        this.dragUpdate();
      })
      .on('end', () => {
        this.mouseEvent = false;
        this.background.classList.remove('mousedown');
        this.dragUpdate();
        if (this.changeValue !== this.value) this.dispatchChange();
        this.changeValue = this.value;
      });
    this.drag(select(this.background));

    this.addEventListener('focusin', () => {
      if(!this.mouseEvent) {
        this.background.classList.add('focus');
      }
    });
    this.addEventListener('focusout', () => {
      this.background.classList.remove('focus');
    });
    this.addEventListener('keydown', this.onKeyDown);

  }

  static get observedAttributes() {return ['min', 'max', 'value', 'step', 'ticks', 'origin', 'tickValues', 'tickLabels']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (isNaN(newValue) || newValue === undefined || newValue === null) return;
    if (attr == 'min') {
      this.min = +newValue;
      this.setAttribute('aria-valuemin', this.min);
    }
    if (attr == 'max') {
      this.max = +newValue;
      this.setAttribute('aria-valuemax', this.max);
    }
    if (attr == 'value') {
      this.update(+newValue);
    }
    if (attr == 'origin') {
      this.origin = +newValue;
      // this.update(this.value);
    }
    if (attr == 'step') {
      if (newValue > 0) {
        this.step = +newValue;
      }
    }
    if (attr == 'ticks') {
      this.ticks = (newValue === '' ? true : newValue);
    }
  }

  onKeyDown(event) {
    this.changeValue = this.value;
    let stopPropagation = false;
    switch (event.keyCode) {
    case keyCodes.left:
    case keyCodes.down:
      this.update(this.value - this.step);
      stopPropagation = true;
      break;
    case keyCodes.right:
    case keyCodes.up:
      this.update(this.value + this.step);
      stopPropagation = true;
      break;
    case keyCodes.pageUp:
      this.update(this.value + this.step * 10);
      stopPropagation = true;
      break;

    case keyCodes.pageDown:
      this.update(this.value + this.step * 10);
      stopPropagation = true;
      break;
    case keyCodes.home:
      this.update(this.min);
      stopPropagation = true;
      break;
    case keyCodes.end:
      this.update(this.max);
      stopPropagation = true;
      break;
    default:
      break;
    }
    if (stopPropagation) {
      this.background.classList.add('focus');
      event.preventDefault();
      event.stopPropagation();
      if (this.changeValue !== this.value) this.dispatchChange();
    }
  }

  validateValueRange(min, max, value) {
    return Math.max(Math.min(max, value), min);
  }

  quantizeValue(value, step) {
    return Math.round(value / step) * step;
  }

  dragUpdate() {
    const bbox = this.background.getBoundingClientRect();
    const x = currentEvent.x;
    const width = bbox.width;
    this.update(this.scale.invert(x / width));
  }

  update(value) {
    let v = value;
    if (this.step !== 'any') {
      v = this.quantizeValue(value, this.step);
    }
    v = this.validateValueRange(this.min, this.max, v);
    if (this.connected) {
      this.knob.style.left = this.scale(v) * 100 + '%';
      this.trackFill.style.width = this.scale(this.min + Math.abs(v - this.origin)) * 100 + '%';
      this.trackFill.style.left = this.scale(Math.min(v, this.origin)) * 100 + '%';
    }
    if (this.value !== v) {
      this.value = v;
      this.setAttribute('aria-valuenow', this.value);
      this.dispatchInput();
    }
  }

  // Dispatches only on a committed change (basically only on mouseup).
  dispatchChange() {
    const e = new Event('change');
    this.dispatchEvent(e, {});
  }

  // Dispatches on each value change.
  dispatchInput() {
    const e = new Event('input');
    this.dispatchEvent(e, {});
  }

  renderTicks() {
    const ticksContainer = this.root.querySelector('.ticks');
    if (this.ticks !== false) {
      let tickData = [];
      if (this.ticks > 0) {
        tickData = this.scale.ticks(this.ticks);
      } else if (this.step === 'any') {
        tickData = this.scale.ticks();
      } else {
        tickData = range(this.min, this.max + 1e-6, this.step);
      }
      tickData.forEach(d => {
        const tick = document.createElement('div');
        tick.classList.add('tick');
        tick.style.left = this.scale(d) * 100 + '%';
        ticksContainer.appendChild(tick);
      });
    } else {
      ticksContainer.style.display = 'none';
    }
  }
}
