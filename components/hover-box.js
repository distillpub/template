function make_hover_css(pos) {
  var pretty = window.innerWidth > 600;
  var padding = pretty? 18 : 12;
  var outer_padding = pretty ? 18 : 0;
  var bbox = document.querySelector("body").getBoundingClientRect();
  var left = pos[0] - bbox.left, top = pos[1] - bbox.top;
  var width = Math.min(window.innerWidth-2*outer_padding, 648);
  left = Math.min(left, window.innerWidth-width-outer_padding);
  width = width - 2*padding;
  return (`position: absolute;
     background-color: #FFF;
     opacity: 0.95;
     max-width: ${width}px;
     top: ${top}px;
     left: ${left}px;
     border: 1px solid rgba(0, 0, 0, 0.25);
     padding: ${padding}px;
     border-radius: ${pretty? 3 : 0}px;
     box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);
     z-index: ${1e6};`);
}


export class HoverBox {

  constructor(div) {
    this.div = div;
    this.visible = false;
    this.bindDivEvents(div);
    HoverBox.box_map[div.id] = this;
  }

}

HoverBox.box_map = {};

HoverBox.get_box = function get_box(div_id) {
  if (div_id in HoverBox.box_map) {
    return HoverBox.box_map[div_id];
  } else {
    return new HoverBox(div_id);
  }
}

HoverBox.prototype.show = function show(pos){
  this.visible = true;
  this.div.setAttribute("style", make_hover_css(pos) );
  for (var box_id in HoverBox.box_map) {
    var box = HoverBox.box_map[box_id];
    if (box != this) box.hide();
  }
}

HoverBox.prototype.showAtNode = function showAtNode(node){
    var bbox = node.getBoundingClientRect();
    this.show([bbox.right, bbox.bottom]);
}

HoverBox.prototype.hide = function hide(){
  this.visible = false;
  if (this.div) this.div.setAttribute("style", "display:none");
  if (this.timeout) clearTimeout(this.timeout);
}

HoverBox.prototype.stopTimeout = function stopTimeout() {
  if (this.timeout) clearTimeout(this.timeout);
}

HoverBox.prototype.extendTimeout = function extendTimeout(T) {
  //console.log("extend", T)
  var this_ = this;
  this.stopTimeout();
  this.timeout = setTimeout(function(){this_.hide();}.bind(this), T);
}

// Bind events to a link to open this box
HoverBox.prototype.bind = function bind(node) {
  if (typeof node == "string"){
    node = document.querySelector(node);
  }

  node.addEventListener("mouseover", function(){
    if (!this.visible) this.showAtNode(node);
    this.stopTimeout();
  }.bind(this));

  node.addEventListener("mouseout", function(){this.extendTimeout(250);}.bind(this));

  node.addEventListener("touchstart", function(e) {
    if (this.visible) {
      this.hide();
    } else {
      this.showAtNode(node);
    }
    // Don't trigger body touchstart event when touching link
    e.stopPropagation();
  }.bind(this));
}

HoverBox.prototype.bindDivEvents = function bindDivEvents(node){
  // For mice, same behavior as hovering on links
  this.div.addEventListener("mouseover", function(){
    if (!this.visible) this.showAtNode(node);
    this.stopTimeout();
  }.bind(this));
  this.div.addEventListener("mouseout", function(){this.extendTimeout(250);}.bind(this));

  // Don't trigger body touchstart event when touching within box
  this.div.addEventListener("touchstart", function(e){e.stopPropagation();});
  // Close box when touching outside box
  document.body.addEventListener("touchstart", function(){this.hide();}.bind(this));
}
