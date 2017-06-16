export default function(dom, data) {

  var appendFootnoteHoverDiv = (function() {
    function nodeFromString(str) {
      var div = dom.createElement("div");
      div.innerHTML = str;
      return div.firstChild;
    }
    var hover_boxes_container = nodeFromString(`<div id="footnote-hover-boxes-container"></div>`)
    dom.querySelector("body").appendChild(hover_boxes_container);
    var hover_n = 0;
    return function appendHoverDiv(content) {
      var id = `dt-fn-hover-box-${hover_n}`;
      hover_n += 1;
      var str = `<div style="display:none;" class="dt-hover-box" id="${id}" >${content}</div>`;
      var div = nodeFromString(str);
      hover_boxes_container.appendChild(div);
      return id;
    }
  })();


  var fnTags = [].slice.apply(dom.querySelectorAll("dt-fn"));
  var fnContent = [];
  fnTags.forEach((el,n) => {
    var content = el.innerHTML;
    var ref_id = appendFootnoteHoverDiv(content)
    fnContent.push(content);
    n = (n+1)+"";
    var key = "fn-"+n;
    var escaped_content = content.replace(/"/g, "&#39;");
    el.innerHTML = `<sup><span id="${key}" data-hover-ref="${ref_id}" style="cursor:pointer">${n}</span></sup>`;
  });

  let fnList = dom.querySelector("dt-fn-list");
  if (fnList) {
    let ol = dom.createElement("ol");
    fnContent.forEach(content => {
      let el = dom.createElement("li");
      el.innerHTML = content;
      ol.appendChild(el);
    })
    fnList.appendChild(ol);
  }

}
