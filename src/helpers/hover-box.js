// function make_hover_css(target_node, pos) {
//   const pretty = window.innerWidth > 600;
//   const padding = pretty? 18 : 12;
//   const outer_padding = pretty ? 18 : 0;
//   // const bbox = document.querySelector('body').getBoundingClientRect();
//   const bbox = target_node.offsetParent.getBoundingClientRect();
//   let left = pos[0] - bbox.left, top = pos[1] - bbox.top;
//   let width = Math.min(window.innerWidth-2*outer_padding, 648);
//   left = Math.min(left, window.innerWidth-width-outer_padding);
//   width = width - 2 * padding;
//   return (`position: absolute;
//      background-color: #FFF;
//      opacity: 0.95;
//      max-width: ${width}px;
//      top: ${top}px;
//      left: ${left}px;
//      border: 1px solid rgba(0, 0, 0, 0.25);
//      padding: ${padding}px;
//      border-radius: ${pretty? 3 : 0}px;
//      box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);
//      z-index: ${1e6};`);
// }

export class HoverBox {

  constructor(contentHTML, triggerElement) {
    this.visible = false;
    // div hold teh contents of the box that will become visible
    this.div = contentHTML;
    this.bindDivEvents(this.div);
    // triggerElement holds the element that needs to be hovered etc to show contents
    this.triggerElement = triggerElement;
    this.bindTriggerEvents(this.triggerElement);
    this.hide();
  }

  bindDivEvents(node) {
    // For mice, same behavior as hovering on links
    this.div.addEventListener('mouseover', () => {
      if (!this.visible) this.showAtNode(node);
      this.stopTimeout();
    });
    this.div.addEventListener('mouseout', () => {
      this.extendTimeout(500);
    });
    // Don't trigger body touchstart event when touching within box
    this.div.addEventListener('touchstart', (event) => {
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
      this.extendTimeout(500);
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
    // const css = make_hover_css(this.triggerElement, position);
    this.div.setAttribute('style', 'display: block;' );
  }

  showAtNode(node) {
    const bbox = node.getBoundingClientRect();
    this.show([bbox.right, bbox.bottom]);
  }

  hide() {
    this.visible = false;
    this.div.setAttribute('style', 'display: none;');
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
