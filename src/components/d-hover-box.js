import { Template } from '../mixins/template.js';

const T = Template('d-hover-box', `
<style>

:host {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 10000;
  display: none;
}

.container {
  position: relative;
  width: 704px;
  max-width: 100vw;
  margin: 0 auto;
}

.panel {
  position: absolute;
  font-size: 1rem;
  line-height: 1.5em;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(250, 250, 250);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
}

</style>

<div class="container">
  <div class="panel">
    <slot></slot>
  </div>
</div>
`);

export class HoverBox extends T(HTMLElement) {

  constructor() {
    super();
  }

  connectedCallback() {

  }

  listen(element) {
    // console.log(element)
    this.bindDivEvents(this);
    this.bindTriggerEvents(element);
    // this.style.display = "block";
  }

  bindDivEvents(element) {
    // For mice, same behavior as hovering on links
    element.addEventListener('mouseover', () => {
      if (!this.visible) this.showAtNode(element);
      this.stopTimeout();
    });
    element.addEventListener('mouseout', () => {
      this.extendTimeout(500);
    });
    // Don't trigger body touchstart event when touching within box
    element.addEventListener('touchstart', (event) => {
      event.stopPropagation();
    }, {passive: true});
    // Close box when touching outside box
    document.body.addEventListener('touchstart', () => {
      this.hide();
    }, {passive: true});
  }

  bindTriggerEvents(node) {
    node.addEventListener('mouseover', () => {
      if (!this.visible) {
        this.showAtNode(node);
      }
      this.stopTimeout();
    });

    node.addEventListener('mouseout', () => {
      this.extendTimeout(300);
    });

    node.addEventListener('touchstart', (event) => {
      if (this.visible) {
        this.hide();
      } else {
        this.showAtNode(node);
      }
      // Don't trigger body touchstart event when touching link
      event.stopPropagation();
    }, {passive: true});
  }

  show(position) {
    this.visible = true;
    this.style.display = 'block';
  }

  showAtNode(node) {
    const bbox = node.getBoundingClientRect();
    this.show([bbox.right, bbox.bottom]);
  }

  hide() {
    this.visible = false;
    this.style.display = 'none';
    this.stopTimeout();
  }

  stopTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  extendTimeout(time) {
    this.stopTimeout();
    this.timeout = setTimeout(() => {
      this.hide();
    }, time);
  }

}
