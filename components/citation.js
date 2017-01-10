export default function(dom, data) {
  let citations = data.citations;
  /*if (data.citations) {
    citations = Object.keys(data.citations).map(c => data.citations[c]);
    citations.sort((a, b) => {
      return a.author.localeCompare(b.author);
    });
  }*/

  var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
  citeTags.forEach((el,n) => {
    var key = el.getAttribute("key");
    if (key) {
      var keys = key.split(",");
      var cite_string = inline_cite_short(keys);
      el.innerHTML = `<span id="citation-${n}" class="citation">${cite_string}</span>`;
      DistillHoverBox.bind(`#citation-${n}`, key)

      DistillHoverBox.contentMap[key] = "";
      keys.map((key,n) => {
        if (n>0) DistillHoverBox.contentMap[key] += "<br>";
        var cite_str = bibliography_cite(data.bibliography[key], true);
        DistillHoverBox.contentMap[key] += cite_str;
      })
    }
  });

  let bibEl = dom.querySelector("dt-bibliography");
  if (bibEl) {
    let ol = dom.createElement("ol");
    citations.forEach(key => {
      let el = dom.createElement("li");
      el.textContent = bibliography_cite(data.bibliography[key]);
      ol.appendChild(el);
    })
    bibEl.appendChild(ol);
  }

  function inline_cite_short(keys){
    function cite_string(key){
      if (key in data.bibliography){
        var n = data.citations.indexOf(key)+1;
        return ""+n;
      } else {
        return "?";
      }
    }
    return "["+keys.map(cite_string).join(", ")+"]";
  }

  function inline_cite_long(keys){
    function cite_string(key){
      if (key in data.bibliography){
        var ent = data.bibliography[key];
        var names = ent.author.split(" and ");
        names = names.map(name => name.split(",")[0].trim())
        var year = ent.year;
        if (names.length == 1) return names[0] + ", " + year;
        if (names.length == 2) return names[0] + " & " + names[1] + ", " + year;
        if (names.length  > 2) return names[0] + ", et al., " + year;
      } else {
        return "?";
      }
    }
    return keys.map(cite_string).join(", ");
  }

  function bibliography_cite(ent, fancy){
    if (ent){
      var names = ent.author.split(" and ");
      var cite = "";
      let name_strings = names.map(name => {
        var last = name.split(",")[0].trim();
        var firsts = name.split(",")[1];
        if (firsts != undefined) {
          var initials = firsts.trim().split(" ").map(s => s.trim()[0]);
          return last + ", " + initials.join(".")+".";
        }
        return last;
      });
      if (names.length > 1) {
        cite += name_strings.slice(0, names.length-1).join(", ");
        cite += " and " + name_strings[names.length-1];
      } else {
        cite += name_strings[0]
      }
      cite += ", " + ent.year + ". "
      if (fancy){
        cite += "<b>" + ent.title + "</b>. "
      } else {
        cite += ent.title + ". "
      }
      cite += (ent.journal || ent.booktitle || "")
      if ("volume" in ent){
        var issue = ent.issue || ent.number;
        issue = (issue != undefined)? "("+issue+")" : "";
        cite += ", Vol " + ent.volume + issue;
      }
      if ("pages" in ent){
        cite += ", pp. " + ent.pages
      }
      cite += ". "
      if (fancy && ent.url && ent.url.slice(-4) == ".pdf") {
        cite = `${cite} <a href="${ent.url}">[pdf]</a>`
      }
      return cite
    } else {
      return "?";
    }
  }


  //https://scholar.google.com/scholar?q=allintitle%3ADocument+author%3Aolah
  function get_URL(ent){
    if (ent){
      var names = ent.author.split(" and ");
      names = names.map(name => name.split(",")[0].trim())
      var title = ent.title.split(" ")//.replace(/[,:]/, "")
      var url = "http://search.labs.crossref.org/dois?"//""https://scholar.google.com/scholar?"
      url += uris({q: names.join(" ") + " " + title.join(" ")})
    }

  }
}

// DistillHoverBox
//=====================================

function DistillHoverBox(key, pos){

  if (!(key in DistillHoverBox.contentMap)){
    console.error("No DistillHoverBox content registered for key", key);
  }
  if (key in DistillHoverBox.liveBoxes) {
    console.error("There already exists a DistillHoverBox for key", key);
  } else {
    for (var k in DistillHoverBox.liveBoxes)
      DistillHoverBox.liveBoxes[k].remove();
    DistillHoverBox.liveBoxes[key] = this;
  }
  this.key = key;

  var pretty = window.innerWidth > 600;

  var padding = pretty? 18 : 12;
  var outer_padding = pretty ? 18 : 0;
  var bbox = document.querySelector("body").getBoundingClientRect();
  var left = pos[0] - bbox.left, top = pos[1] - bbox.top;
  var width = Math.min(window.innerWidth-2*outer_padding, 648);
  left = Math.min(left, window.innerWidth-width-outer_padding);
  width = width - 2*padding;

  var str = `<div style="position: absolute;
                          background-color: #FFF;
                          opacity: 0.95;
                          width: ${width}px;
                          top: ${top}px;
                          left: ${left}px;
                          padding: ${padding}px;
                          border-radius: ${pretty? 6 : 0}px;
                          box-shadow: 0px 0px 18px 6px #777;" >
              ${DistillHoverBox.contentMap[key]}
              </div>`;

  this.div = appendBody(str);

  DistillHoverBox.bind (this.div, key);
}

DistillHoverBox.prototype.remove = function remove(){
  if (this.div) this.div.remove();
  if (this.timeout) clearTimeout(this.timeout);
  delete DistillHoverBox.liveBoxes[this.key];
}

DistillHoverBox.prototype.stopTimeout = function stopTimeout() {
  if (this.timeout) clearTimeout(this.timeout);
}

DistillHoverBox.prototype.extendTimeout = function extendTimeout(T) {
  //console.log("extend", T)
  var this_ = this;
  this.stopTimeout();
  this.timeout = setTimeout(() => this_.remove(), T);
}

DistillHoverBox.liveBoxes = {};
DistillHoverBox.contentMap = {abc: "hello world!"};

DistillHoverBox.bind = function bind(node, key) {
  if (typeof node == "string"){
    node = document.querySelector(node);
  }
  node.addEventListener("mouseover", () => {
    var bbox = node.getBoundingClientRect();
    if (!(key in DistillHoverBox.liveBoxes)){
      new DistillHoverBox(key, [bbox.right, bbox.bottom]);
    }
    DistillHoverBox.liveBoxes[key].stopTimeout();
  });
  node.addEventListener("mouseout", () => {
    if (key in DistillHoverBox.liveBoxes){
      DistillHoverBox.liveBoxes[key].extendTimeout(250);
    }
  });

}


function appendBody(str){
  var node = nodeFromString(str);
  var body = document.querySelector("body");
  body.appendChild(node);
  return node;
}

function nodeFromString(str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  return div.firstChild;
}
