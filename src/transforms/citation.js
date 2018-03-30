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

export default function(dom, data) {
  let css = `
    dt-cite {
      color: hsla(206, 90%, 20%, 0.7);
    }
    dt-cite .citation-number {
      cursor: default;
      white-space: nowrap;
      font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
      font-size: 75%;
      color: hsla(206, 90%, 20%, 0.7);
      display: inline-block;
      line-height: 1.1em;
      text-align: center;
      position: relative;
      top: -2px;
      margin: 0 2px;
    }
    figcaption dt-cite .citation-number {
      font-size: 11px;
      font-weight: normal;
      top: -2px;
      line-height: 1em;
    }
  `;

  let style = dom.createElement('style');
  style.textContent = css;
  dom.querySelector('body').appendChild(style);

  let citations = data.citations;
  /*if (data.citations) {
    citations = Object.keys(data.citations).map(c => data.citations[c]);
    citations.sort((a, b) => {
      return a.author.localeCompare(b.author);
    });
  }*/

  var citeTags = [].slice.apply(dom.querySelectorAll('dt-cite'));
  citeTags.forEach((el,n) => {
    var key = el.getAttribute('key');
    if (key) {
      var keys = key.split(',');
      var cite_string = inline_cite_short(keys);
      var cite_hover_str = '';
      keys.map((key,n) => {
        if (n>0) cite_hover_str += '<br><br>';
        cite_hover_str += hover_cite(data.bibliography[key]);
      });
      cite_hover_str = cite_hover_str.replace(/"/g, '&#39;');
      var orig_string = el.innerHTML;
      if (orig_string != '') orig_string += ' ';
      el.innerHTML = `<span id="citation-${n}" data-hover="${cite_hover_str}">${orig_string}<span class="citation-number">${cite_string}</span></span>`;
    }
  });

  let bibEl = dom.querySelector('dt-bibliography');
  if (bibEl) {
    let ol = dom.createElement('ol');
    citations.forEach(key => {
      let el = dom.createElement('li');
      el.innerHTML = bibliography_cite(data.bibliography[key]);
      ol.appendChild(el);
    });
    bibEl.appendChild(ol);
  }

  function inline_cite_short(keys){
    function cite_string(key){
      if (key in data.bibliography){
        var n = data.citations.indexOf(key)+1;
        return ''+n;
      } else {
        return '?';
      }
    }
    return '['+keys.map(cite_string).join(', ')+']';
  }

  function inline_cite_long(keys){
    function cite_string(key){
      if (key in data.bibliography){
        var ent = data.bibliography[key];
        var names = ent.author.split(' and ');
        names = names.map(name => name.split(',')[0].trim());
        var year = ent.year;
        if (names.length == 1) return names[0] + ', ' + year;
        if (names.length == 2) return names[0] + ' & ' + names[1] + ', ' + year;
        if (names.length  > 2) return names[0] + ', et al., ' + year;
      } else {
        return '?';
      }
    }
    return keys.map(cite_string).join(', ');
  }

  function author_string(ent, template, sep, finalSep){
    if (ent.author == null) { return ''; }
    var names = ent.author.split(' and ');
    let name_strings = names.map(name => {
      name = name.trim();
      if (name.indexOf(',') != -1){
        var last = name.split(',')[0].trim();
        var firsts = name.split(',')[1];
      } else {
        var last = name.split(' ').slice(-1)[0].trim();
        var firsts = name.split(' ').slice(0,-1).join(' ');
      }
      var initials = '';
      if (firsts != undefined) {
        initials = firsts.trim().split(' ').map(s => s.trim()[0]);
        initials = initials.join('.')+'.';
      }
      return template.replace('${F}', firsts)
        .replace('${L}', last)
        .replace('${I}', initials);
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
    var cite = (ent.journal || ent.booktitle || '');
    if ('volume' in ent){
      var issue = ent.issue || ent.number;
      issue = (issue != undefined)? '('+issue+')' : '';
      cite += ', Vol ' + ent.volume + issue;
    }
    if ('pages' in ent){
      cite += ', pp. ' + ent.pages;
    }
    if (cite != '') cite += '. ';
    if ('publisher' in ent){
      cite += ent.publisher;
      if (cite[cite.length-1] != '.') cite += '.';
    }
    return cite;
  }

  function link_string(ent){
    if ('url' in ent){
      var url = ent.url;
      var arxiv_match = (/arxiv\.org\/abs\/([0-9\.]*)/).exec(url);
      if (arxiv_match != null){
        url = `http://arxiv.org/pdf/${arxiv_match[1]}.pdf`;
      }

      if (url.slice(-4) == '.pdf'){
        var label = 'PDF';
      } else if (url.slice(-5) == '.html') {
        var label = 'HTML';
      }
      return ` &ensp;<a href="${url}">[${label||'link'}]</a>`;
    }/* else if ("doi" in ent){
      return ` &ensp;<a href="https://doi.org/${ent.doi}" >[DOI]</a>`;
    }*/ else {
      return '';
    }
  }
  function doi_string(ent, new_line){
    if ('doi' in ent) {
      return `${new_line?'<br>':''} <a href="https://doi.org/${ent.doi}" style="text-decoration:inherit;">DOI: ${ent.doi}</a>`;
    } else {
      return '';
    }
  }

  function bibliography_cite(ent, fancy){
    if (ent){
      var cite =  '<b>' + ent.title + '</b> ';
      cite += link_string(ent) + '<br>';
      cite += author_string(ent, '${L}, ${I}', ', ', ' and ');
      if (ent.year || ent.date){
        cite += ', ' + (ent.year || ent.date) + '. ';
      } else {
        cite += '. ';
      }
      cite += venue_string(ent);
      cite += doi_string(ent);
      return cite;
      /*var cite =  author_string(ent, "${L}, ${I}", ", ", " and ");
      if (ent.year || ent.date){
        cite += ", " + (ent.year || ent.date) + ". "
      } else {
        cite += ". "
      }
      cite += "<b>" + ent.title + "</b>. ";
      cite += venue_string(ent);
      cite += doi_string(ent);
      cite += link_string(ent);
      return cite*/
    } else {
      return '?';
    }
  }

  function hover_cite(ent){
    if (ent){
      var cite = '';
      cite += '<b>' + ent.title + '</b>';
      cite += link_string(ent);
      cite += '<br>';

      var a_str = author_string(ent, '${I} ${L}', ', ') + '.';
      var v_str = venue_string(ent).trim() + ' ' + ent.year + '. ' + doi_string(ent, true);

      if ((a_str+v_str).length < Math.min(40, ent.title.length)) {
        cite += a_str + ' ' + v_str;
      } else {
        cite += a_str + '<br>' + v_str;
      }
      return cite;
    } else {
      return '?';
    }
  }


  //https://scholar.google.com/scholar?q=allintitle%3ADocument+author%3Aolah
  function get_GS_URL(ent){
    if (ent){
      var names = ent.author.split(' and ');
      names = names.map(name => name.split(',')[0].trim());
      var title = ent.title.split(' ');//.replace(/[,:]/, "")
      var url = 'http://search.labs.crossref.org/dois?';//""https://scholar.google.com/scholar?"
      url += uris({q: names.join(' ') + ' ' + title.join(' ')});
    }

  }
}
