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

export function _moveLegacyAffiliationFormatIntoArray(frontMatter) {
  // authors used to have propoerties "affiliation" and "affiliationURL".
  // We now encourage using an array for affiliations containing objects with
  // properties "name" and "url".
  for (let author of frontMatter.authors) {
    const hasOldStyle = Boolean(author.affiliation)
    const hasNewStyle = Boolean(author.affiliations)
    if (!hasOldStyle) continue;
    if (hasNewStyle) {
      console.warn(`Author ${author.author} has both old-style ("affiliation" & "affiliationURL") and new style ("affiliations") affiliation information!`)
    } else {
      let newAffiliation = {
        "name": author.affiliation
      }
      if (author.affiliationURL) newAffiliation.url = author.affiliationURL;
      author.affiliations = [newAffiliation];
    }
  }
  return frontMatter
}

export function parseFrontmatter(element) {
  const scriptTag = element.firstElementChild;
  if (scriptTag) {
    const type = scriptTag.getAttribute('type');
    if (type.split('/')[1] == 'json') {
      const content = scriptTag.textContent;
      const parsed = JSON.parse(content);
      return _moveLegacyAffiliationFormatIntoArray(parsed);
    } else {
      console.error('Distill only supports JSON frontmatter tags anymore; no more YAML.');
    }
  } else {
    console.error('You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.');
  }
  return {};
}

export class FrontMatter extends HTMLElement {

  static get is() { return 'd-front-matter'; }

  constructor() {
    super();

    const options = {childList: true, characterData: true, subtree: true};
    const observer = new MutationObserver( (entries) => {
      for (const entry of entries) {
        if (entry.target.nodeName === 'SCRIPT' || entry.type === 'characterData') {
          const data = parseFrontmatter(this);
          this.notify(data);
        }
      }
    });
    observer.observe(this, options);
  }

  notify(data) {
    const options = { detail: data, bubbles: true };
    const event = new CustomEvent('onFrontMatterChanged', options);
    document.dispatchEvent(event);
  }

}
