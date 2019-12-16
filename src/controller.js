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

import { FrontMatter, mergeFromYMLFrontmatter } from "./front-matter";
import { DMath } from "./components/d-math";
import { collect_citations } from "./helpers/citation.js";
import { domContentLoaded } from "./helpers/domContentLoaded.js";
import { parseFrontmatter } from "./components/d-front-matter";
import optionalComponents from "./transforms/optional-components";

const frontMatter = new FrontMatter();

export const Controller = {
  frontMatter: frontMatter,
  waitingOn: {
    bibliography: [],
    citations: []
  },
  listeners: {
    onCiteKeyCreated(event) {
      const [citeTag, keys] = event.detail;

      // ensure we have citations
      if (!frontMatter.citationsCollected) {
        // console.debug('onCiteKeyCreated, but unresolved dependency ("citations"). Enqueing.');
        Controller.waitingOn.citations.push(() =>
          Controller.listeners.onCiteKeyCreated(event)
        );
        return;
      }

      // ensure we have a loaded bibliography
      if (!frontMatter.bibliographyParsed) {
        // console.debug('onCiteKeyCreated, but unresolved dependency ("bibliography"). Enqueing.');
        Controller.waitingOn.bibliography.push(() =>
          Controller.listeners.onCiteKeyCreated(event)
        );
        return;
      }

      const numbers = keys.map(key => frontMatter.citations.indexOf(key));
      citeTag.numbers = numbers;
      const entries = keys.map(key => frontMatter.bibliography.get(key));
      citeTag.entries = entries;
    },

    onCiteKeyChanged() {
      // const [citeTag, keys] = event.detail;

      // update citations
      frontMatter.citations = collect_citations();
      frontMatter.citationsCollected = true;
      for (const waitingCallback of Controller.waitingOn.citations.slice()) {
        waitingCallback();
      }

      // update bibliography
      const citationListTag = document.querySelector("d-citation-list");
      const bibliographyEntries = new Map(
        frontMatter.citations.map(citationKey => {
          return [citationKey, frontMatter.bibliography.get(citationKey)];
        })
      );
      citationListTag.citations = bibliographyEntries;

      const citeTags = document.querySelectorAll("d-cite");
      for (const citeTag of citeTags) {
        console.log(citeTag);
        const keys = citeTag.keys;
        const numbers = keys.map(key => frontMatter.citations.indexOf(key));
        citeTag.numbers = numbers;
        const entries = keys.map(key => frontMatter.bibliography.get(key));
        citeTag.entries = entries;
      }
    },

    onCiteKeyRemoved(event) {
      Controller.listeners.onCiteKeyChanged(event);
    },

    onBibliographyChanged(event) {
      const citationListTag = document.querySelector("d-citation-list");

      const bibliography = event.detail;

      frontMatter.bibliography = bibliography;
      frontMatter.bibliographyParsed = true;
      for (const waitingCallback of Controller.waitingOn.bibliography.slice()) {
        waitingCallback();
      }

      // ensure we have citations
      if (!frontMatter.citationsCollected) {
        Controller.waitingOn.citations.push(function() {
          Controller.listeners.onBibliographyChanged({
            target: event.target,
            detail: event.detail
          });
        });
        return;
      }

      if (citationListTag.hasAttribute("distill-prerendered")) {
        console.debug("Citation list was prerendered; not updating it.");
      } else {
        const entries = new Map(
          frontMatter.citations.map(citationKey => {
            return [citationKey, frontMatter.bibliography.get(citationKey)];
          })
        );
        citationListTag.citations = entries;
      }
    },

    onFootnoteChanged() {
      // const footnote = event.detail;
      //TODO: optimize to only update current footnote
      const footnotesList = document.querySelector("d-footnote-list");
      if (footnotesList) {
        const footnotes = document.querySelectorAll("d-footnote");
        footnotesList.footnotes = footnotes;
      }
    },

    onFrontMatterChanged(event) {
      const data = event.detail;
      mergeFromYMLFrontmatter(frontMatter, data);

      const interstitial = document.querySelector("d-interstitial");
      if (interstitial) {
        if (typeof frontMatter.password !== "undefined") {
          interstitial.password = frontMatter.password;
        } else {
          interstitial.parentElement.removeChild(interstitial);
        }
      }

      const prerendered = document.body.hasAttribute("distill-prerendered");
      if (!prerendered && domContentLoaded()) {
        optionalComponents(document, frontMatter);

        const appendix = document.querySelector("distill-appendix");
        if (appendix) {
          appendix.frontMatter = frontMatter;
        }

        const byline = document.querySelector("d-byline");
        if (byline) {
          byline.frontMatter = frontMatter;
        }

        if (data.katex) {
          DMath.katexOptions = data.katex;
        }
      }
    },

    DOMContentLoaded() {
      if (Controller.loaded) {
        console.warn(
          "Controller received DOMContentLoaded but was already loaded!"
        );
        return;
      } else if (!domContentLoaded()) {
        console.warn(
          "Controller received DOMContentLoaded at document.readyState: " +
            document.readyState +
            "!"
        );
        return;
      } else {
        Controller.loaded = true;
        console.debug("Runlevel 4: Controller running DOMContentLoaded");
      }

      const frontMatterTag = document.querySelector("d-front-matter");
      if (frontMatterTag) {
        const data = parseFrontmatter(frontMatterTag);
        Controller.listeners.onFrontMatterChanged({ detail: data });
      }

      // Resolving "citations" dependency due to initial DOM load
      frontMatter.citations = collect_citations();
      frontMatter.citationsCollected = true;
      for (const waitingCallback of Controller.waitingOn.citations.slice()) {
        waitingCallback();
      }

      if (frontMatter.bibliographyParsed) {
        for (const waitingCallback of Controller.waitingOn.bibliography.slice()) {
          waitingCallback();
        }
      }

      const footnotesList = document.querySelector("d-footnote-list");
      if (footnotesList) {
        const footnotes = document.querySelectorAll("d-footnote");
        footnotesList.footnotes = footnotes;
      }
    }
  } // listeners
}; // Controller
