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

// no appendix -> add appendix
// title in front, no h1 -> add it
// no title in front, h1 -> read and put into frontMatter
// footnote -> footnote list
// break up bib
// if citation, no bib-list -> add citation-list

// if authors, no byline -> add byline

export default function(dom, data) {
  const body = dom.body;
  const article = body.querySelector('d-article');

  // If we don't have an article tag, something weird is going on—giving up.
  if (!article) {
    console.warn('No d-article tag found; skipping adding optional components!');
    return;
  }

  let byline = dom.querySelector('d-byline');
  if (!byline) {
    if (data.authors) {
      byline = dom.createElement('d-byline');
      body.insertBefore(byline, article);
    } else {
      console.warn('No authors found in front matter; please add them before submission!');
    }
  }

  let title = dom.querySelector('d-title');
  if (!title) {
    title = dom.createElement('d-title');
    body.insertBefore(title, byline);
  }

  let h1 = title.querySelector('h1');
  if (!h1) {
    h1 = dom.createElement('h1');
    h1.textContent = data.title;
    title.insertBefore(h1, title.firstChild);
  }

  const hasPassword = typeof data.password !== 'undefined';
  let interstitial = body.querySelector('d-interstitial');
  if (hasPassword && !interstitial) {
    const inBrowser = typeof window !== 'undefined';
    const onLocalhost = inBrowser && window.location.hostname.includes('localhost');
    if (!inBrowser || !onLocalhost) {
      interstitial = dom.createElement('d-interstitial');
      interstitial.password = data.password;
      body.insertBefore(interstitial, body.firstChild);
    }
  } else if (!hasPassword && interstitial) {
    interstitial.parentElement.removeChild(this);
  }

  let appendix = dom.querySelector('d-appendix');
  if (!appendix) {
    appendix = dom.createElement('d-appendix');
    dom.body.appendChild(appendix);
  }

  let footnoteList = dom.querySelector('d-footnote-list');
  if (!footnoteList) {
    footnoteList = dom.createElement('d-footnote-list');
    appendix.appendChild(footnoteList);
  }

  let citationList = dom.querySelector('d-citation-list');
  if (!citationList) {
    citationList = dom.createElement('d-citation-list');
    appendix.appendChild(citationList);
  }

}
