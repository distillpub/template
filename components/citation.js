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
      var cite_hover_str = "";
      keys.map((key,n) => {
        if (n>0) cite_hover_str += "<br><br>";
        cite_hover_str += hover_cite(data.bibliography[key]);
      });
      cite_hover_str = cite_hover_str.replace(/"/g, "&#39;")
      el.innerHTML = `<span id="citation-${n}" class="citation" data-hover="${cite_hover_str}">${cite_string}</span>`;
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

  function author_string(ent, template, sep, finalSep){
    var names = ent.author.split(" and ");
    let name_strings = names.map(name => {
      var last = name.split(",")[0].trim();
      var firsts = name.split(",")[1];
      var initials = "";
      if (firsts != undefined) {
        initials = firsts.trim().split(" ").map(s => s.trim()[0]);
        initials = initials.join(".")+".";
      }
      return template.replace("F", firsts)
                     .replace("L", last)
                     .replace("I", initials);
    });
    if (names.length > 1) {
      var str = name_strings.slice(0, names.length-1).join(sep);
      str += (finalSep || sep) + name_strings[names.length-1];
      return str;
    } else {
      return name_strings[0];
    }
  }

  function venue_string(ent) {
    var cite = (ent.journal || ent.booktitle || "")
    if ("volume" in ent){
      var issue = ent.issue || ent.number;
      issue = (issue != undefined)? "("+issue+")" : "";
      cite += ", Vol " + ent.volume + issue;
    }
    if ("pages" in ent){
      cite += ", pp. " + ent.pages
    }
    cite += ". "
    if ("publisher" in ent){
      cite += ent.publisher + ".";
    }
    return cite;
  }

  function bibliography_cite(ent, fancy){
    if (ent){
      var cite =  author_string(ent, "L, I", ", ", " and ");
      cite += ", " + ent.year + ". "
      cite += ent.title + ". ";
      cite += venue_string(ent);
      if (fancy && ent.url && ent.url.slice(-4) == ".pdf") {
        cite = `${cite} <a href="${ent.url}">[pdf]</a>`
      }
      return cite
    } else {
      return "?";
    }
  }

  function hover_cite(ent){
    if (ent){
      var cite = "";
      cite += "<b>" + ent.title + "</b>";
      if (ent.url && ent.url.slice(-4) == ".pdf") {
        cite = `${cite} &ensp;<a href="${ent.url}" style="text-decoration:inherit"><b>[PDF]</b></a>`
      }
      if (ent.url && ent.url.slice(-5) == ".html") {
        cite = `${cite} &ensp;<a href="${ent.url}" style="text-decoration:inherit"><b>[HTML]</b></a>`
      }
      cite += "<br>"
      cite += author_string(ent, "I L", ", ") + ".<br>";
      cite += venue_string(ent).trim() + " " + ent.year + ". "
      if ("doi" in ent) {
        cite += `<br> <a href="https://doi.org/${ent.doi}" style="text-decoration:inherit; font-size: 80%;">DOI: ${ent.doi}</a>`
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
