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

// This is a straight concatenation of code from KaTeX's contrib folder,
// but we aren't using some of their helpers that don't work well outside a browser environment.

/*global katex */

const findEndOfMath = function(delimiter, text, startIndex) {
  // Adapted from
  // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
  let index = startIndex;
  let braceLevel = 0;

  const delimLength = delimiter.length;

  while (index < text.length) {
    const character = text[index];

    if (
      braceLevel <= 0 &&
      text.slice(index, index + delimLength) === delimiter
    ) {
      return index;
    } else if (character === "\\") {
      index++;
    } else if (character === "{") {
      braceLevel++;
    } else if (character === "}") {
      braceLevel--;
    }

    index++;
  }

  return -1;
};

const splitAtDelimiters = function(startData, leftDelim, rightDelim, display) {
  const finalData = [];

  for (let i = 0; i < startData.length; i++) {
    if (startData[i].type === "text") {
      const text = startData[i].data;

      let lookingForLeft = true;
      let currIndex = 0;
      let nextIndex;

      nextIndex = text.indexOf(leftDelim);
      if (nextIndex !== -1) {
        currIndex = nextIndex;
        finalData.push({
          type: "text",
          data: text.slice(0, currIndex)
        });
        lookingForLeft = false;
      }

      while (true) {
        // eslint-disable-line no-constant-condition
        if (lookingForLeft) {
          nextIndex = text.indexOf(leftDelim, currIndex);
          if (nextIndex === -1) {
            break;
          }

          finalData.push({
            type: "text",
            data: text.slice(currIndex, nextIndex)
          });

          currIndex = nextIndex;
        } else {
          nextIndex = findEndOfMath(
            rightDelim,
            text,
            currIndex + leftDelim.length
          );
          if (nextIndex === -1) {
            break;
          }

          finalData.push({
            type: "math",
            data: text.slice(currIndex + leftDelim.length, nextIndex),
            rawData: text.slice(currIndex, nextIndex + rightDelim.length),
            display: display
          });

          currIndex = nextIndex + rightDelim.length;
        }

        lookingForLeft = !lookingForLeft;
      }

      finalData.push({
        type: "text",
        data: text.slice(currIndex)
      });
    } else {
      finalData.push(startData[i]);
    }
  }

  return finalData;
};

const splitWithDelimiters = function(text, delimiters) {
  let data = [{ type: "text", data: text }];
  for (let i = 0; i < delimiters.length; i++) {
    const delimiter = delimiters[i];
    data = splitAtDelimiters(
      data,
      delimiter.left,
      delimiter.right,
      delimiter.display || false
    );
  }
  return data;
};

/* Note: optionsCopy is mutated by this method. If it is ever exposed in the
 * API, we should copy it before mutating.
 */
const renderMathInText = function(text, optionsCopy) {
  const data = splitWithDelimiters(text, optionsCopy.delimiters);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === "text") {
      fragment.appendChild(document.createTextNode(data[i].data));
    } else {
      const tag = document.createElement("d-math");
      const math = data[i].data;
      // Override any display mode defined in the settings with that
      // defined by the text itself
      optionsCopy.displayMode = data[i].display;
      try {
        tag.textContent = math;
        if (optionsCopy.displayMode) {
          tag.setAttribute("block", "");
        }
      } catch (e) {
        if (!(e instanceof katex.ParseError)) {
          throw e;
        }
        optionsCopy.errorCallback(
          "KaTeX auto-render: Failed to parse `" + data[i].data + "` with ",
          e
        );
        fragment.appendChild(document.createTextNode(data[i].rawData));
        continue;
      }
      fragment.appendChild(tag);
    }
  }

  return fragment;
};

const renderElem = function(elem, optionsCopy) {
  for (let i = 0; i < elem.childNodes.length; i++) {
    const childNode = elem.childNodes[i];
    if (childNode.nodeType === 3) {
      // Text node
      const text = childNode.textContent;
      if (optionsCopy.mightHaveMath(text)) {
        const frag = renderMathInText(text, optionsCopy);
        i += frag.childNodes.length - 1;
        elem.replaceChild(frag, childNode);
      }
    } else if (childNode.nodeType === 1) {
      // Element node
      const shouldRender =
        optionsCopy.ignoredTags.indexOf(childNode.nodeName.toLowerCase()) ===
        -1;

      if (shouldRender) {
        renderElem(childNode, optionsCopy);
      }
    }
    // Otherwise, it's something else, and ignore it.
  }
};

const defaultAutoRenderOptions = {
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "\\[", right: "\\]", display: true },
    { left: "\\(", right: "\\)", display: false }
    // LaTeX uses this, but it ruins the display of normal `$` in text:
    // {left: '$', right: '$', display: false},
  ],

  ignoredTags: [
    "script",
    "noscript",
    "style",
    "textarea",
    "pre",
    "code",
    "svg"
  ],

  errorCallback: function(msg, err) {
    console.error(msg, err);
  }
};

export const renderMathInElement = function(elem, options) {
  if (!elem) {
    throw new Error("No element provided to render");
  }

  const optionsCopy = Object.assign({}, defaultAutoRenderOptions, options);
  const delimiterStrings = optionsCopy.delimiters.flatMap(d => [
    d.left,
    d.right
  ]);
  const mightHaveMath = text =>
    delimiterStrings.some(d => text.indexOf(d) !== -1);
  optionsCopy.mightHaveMath = mightHaveMath;
  renderElem(elem, optionsCopy);
};
