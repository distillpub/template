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

export default function(dom) {

  var textNodes = dom.createTreeWalker(
    dom.body,
    dom.defaultView.NodeFilter.SHOW_TEXT
  );
  while (textNodes.nextNode()) {
    var n = textNodes.currentNode,
      text = n.nodeValue;
    if (text && acceptNode(n)) {
      text = quotes(text);
      text = punctuation(text);
      // TODO: Add back support for ligatures once their uppercased versions don't hang Chrome search anymore
      // see: https://bugs.chromium.org/p/chromium/issues/detail?id=862648
      // text = ligatures(text);
      n.nodeValue = text;
    }
  }
}

// 2018-07-11 shancarter@ and ludwigschubert@ no longer know what this was meant to accomplish
// if it was trying to not replace text in any child nodes of those listed here,
// then it does not accomplish that.
function acceptNode(node) {
  var parent = node.parentElement;
  var isMath = (parent && parent.getAttribute && parent.getAttribute('class')) ? parent.getAttribute('class').includes('katex') || parent.getAttribute('class').includes('MathJax') : false;
  return parent &&
         parent.nodeName !== 'SCRIPT' &&
         parent.nodeName !== 'STYLE' &&
         parent.nodeName !== 'CODE' &&
         parent.nodeName !== 'PRE' &&
         parent.nodeName !== 'SPAN' &&
         parent.nodeName !== 'D-HEADER' &&
         parent.nodeName !== 'D-BYLINE' &&
         parent.nodeName !== 'D-MATH' &&
         parent.nodeName !== 'D-CODE' &&
         parent.nodeName !== 'D-BIBLIOGRAPHY' &&
         parent.nodeName !== 'D-FOOTER' &&
         parent.nodeName !== 'D-APPENDIX' &&
         parent.nodeName !== 'D-FRONTMATTER' &&
         parent.nodeName !== 'D-TOC' &&
         parent.nodeType !== 8 && //comment nodes
         !isMath;
}


/*!
 * typeset - Typesetting for the web
 * @version v0.1.6
 * @link https://github.com/davidmerfield/Typeset.js
 * @author David Merfield
 */
// which has a CC0 license
// http://creativecommons.org/publicdomain/zero/1.0/


function punctuation(text){

  // Dashes
  text = text.replace(/--/g, '\u2014');
  text = text.replace(/\s*\u2014\s*/g,'\u2009\u2014\u2009'); //this has thin spaces

  // Elipses
  text = text.replace(/\.\.\./g,'…');

  // Nbsp for punc with spaces
  var NBSP = '\u00a0';
  var NBSP_PUNCTUATION_START = /([«¿¡]) /g;
  var NBSP_PUNCTUATION_END = / ([!?:;.,‽»])/g;

  text = text.replace(NBSP_PUNCTUATION_START, '$1' + NBSP);
  text = text.replace(NBSP_PUNCTUATION_END, NBSP + '$1');

  return text;
}

function quotes(text) {

  text = text
    .replace(/(\W|^)"([^\s!?:;.,‽»])/g, '$1\u201c$2') // beginning "
    .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2') // ending "
    .replace(/([^0-9])"/g,'$1\u201d') // remaining " at end of word
    .replace(/(\W|^)'(\S)/g, '$1\u2018$2') // beginning '
    .replace(/([a-z])'([a-z])/ig, '$1\u2019$2') // conjunction's possession
    .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3') // ending '
    .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3') // abbrev. years like '93
    .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
    .replace(/'''/g, '\u2034') // triple prime
    .replace(/("|'')/g, '\u2033') // double prime
    .replace(/'/g, '\u2032');

  // Allow escaped quotes
  text = text.replace(/\\“/, '"');
  text = text.replace(/\\”/, '"');
  text = text.replace(/\\’/, '\'');
  text = text.replace(/\\‘/, '\'');

  return text;
}

function ligatures(text){

  text = text.replace(/fi/g, 'ﬁ');
  text = text.replace(/fl/g, 'ﬂ');

  return text;
}
