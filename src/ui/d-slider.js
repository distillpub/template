import { Template } from '../mixins/template';
import { scaleLinear } from 'd3-scale';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import  {event as currentEvent } from 'd3-selection';

const T = Template('d-slider', `
<style>
  :host {
    position: relative;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus) .knob {
    background: magenta;
  }

  .background {
    padding-top: 6px;
    color: white;
  }

  .track {
    height: 3px;
    width: 100%;
    border-radius: 2px;
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  .track-fill {
    position: absolute;
    top: 6px;
    height: 3px;
    border-radius: 2px;
    background-color: hsl(24, 100%, 50%);
  }

  .knob-container {
    position: absolute;
    top: 7px;
  }

  .knob {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsl(24, 100%, 50%);
    border-radius: 50%;
  }

  .ticks {
    position: relative;
    margin-top: 4px;
    height: 4px;
  }

  .ticks .tick {
    position: absolute;
    height: 100%;
    border-left: 1px solid hsla(0, 0%, 0%, 0.2);
  }

</style>

  <div class="background">
    <div class="track"></div>
    <div class="track-fill"></div>
    <div class="knob-container">
      <div class="knob"></div>
    </div>
    <div class="ticks"></div>
  </div>
`);

// Events
// change, only on commit
// input, onslide

// Properties
// min
// max
// step [float | "any"]
//

// ARIA
// The element serving as the focusable slider control has role slider.
// The slider element has the aria-valuenow property set to a decimal value representing the current value of the slider.
// The slider element has the aria-valuemin property set to a decimal value representing the minimum allowed value of the slider.
// The slider element has the aria-valuemax property set to a decimal value representing the maximum al
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
  createdCallback() {
  }
  connectedCallback() {
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }
    this.knob = this.root.querySelector(".knob-container");
    this.background = this.root.querySelector(".background");
    this.trackFill = this.root.querySelector(".track-fill");
    this.min = 0;
    this.max = 1;
    this.value = 0;
    this.step = 0.1;
    this.scale = scaleLinear().domain([this.min, this.max]).range([0, 1]).clamp(true);
    this.drag = drag()
    .container(this.root.querySelector(".track"))
    .on("start drag", () => {
      const bbox = this.background.getBoundingClientRect();
      const left = bbox.left;
      const x = event.x - left;
      const width = bbox.width;
      this.update(this.scale.invert(x / width));
    });
    this.drag(select(this.background));
    this.renderTicks(5);
    this.addEventListener("keydown", (e) => {
      console.log("keydown", e);
      let stopPropagation = false;
      switch (event.keyCode) {
        case keyCodes.left:
        case keyCodes.down:
          this.update(this.value - this.step)
          stopPropagation = true;
          break;
        case keyCodes.right:
        case keyCodes.up:
          this.update(this.value + this.step)
          stopPropagation = true;
          break;
        case keyCodes.pageUp:
          this.update(this.value + this.step * 10)
          stopPropagation = true;
          break;

        case keyCodes.pageDown:
          this.update(this.value + this.step * 10)
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
        e.preventDefault();
        e.stopPropagation();
      }

    });
    this.addEventListener("focus", () => {
      console.log("focus");
    });
    this.addEventListener("blur", () => {
      console.log("blur");
    })
  }

  update(value) {
    console.log(value)
    this.knob.style.left = this.scale(value) * 100 + "%";
    this.trackFill.style.width = this.scale(value) * 100 + "%";
    this.value = value;
    this.dispatchInput();
  }

  dispatchChange() {
    const e = new Event("change");
    this.dispatchEvent(e, {});
  }

  dispatchInput() {
    const e = new Event("input");
    this.dispatchEvent(e);
  }

  renderTicks(numTicks) {
    const ticksContainer = this.root.querySelector(".ticks");
    const tickData = this.scale.ticks(numTicks);
    tickData.forEach(d => {
      const tick = document.createElement("div");
      tick.classList.add("tick");
      tick.style.left = this.scale(d) * 100 + "%";
      ticksContainer.appendChild(tick)
    });
  }
}