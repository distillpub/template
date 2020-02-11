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

import { Controller } from './controller';
import { domContentLoaded } from './helpers/domContentLoaded.js';

/* Transforms */
import { makeStyleTag }    from './styles/styles';
import { Polyfills }       from './helpers/polyfills';

/* Components */
import { Abstract }        from './components/d-abstract';
import { Appendix }        from './components/d-appendix';
import { Article }         from './components/d-article';
import { Bibliography }    from './components/d-bibliography';
import { Byline }          from './components/d-byline';
import { Cite }            from './components/d-cite';
import { CitationList }    from './components/d-citation-list';
import { Code }            from './components/d-code';
import { Footnote }        from './components/d-footnote';
import { FootnoteList }    from './components/d-footnote-list';
import { FrontMatter }     from './components/d-front-matter';
import { HoverBox }        from './components/d-hover-box';
import { Title }           from './components/d-title';
import { DMath }           from './components/d-math';
import { References }      from './components/d-references';
import { TOC }             from './components/d-toc';
import { Figure }          from './components/d-figure';
import { Interstitial }    from './components/d-interstitial';
import { Slider }          from './ui/d-slider';

/* Distill website specific components */
import { DistillHeader }   from './distill-components/distill-header';
import { DistillAppendix } from './distill-components/distill-appendix';
import { DistillFooter }   from './distill-components/distill-footer';

let templateIsLoading = false;
let runlevel = 0;
const initialize = function() {
  if (window.distill.runlevel < 1) {
    throw new Error("Insufficient Runlevel for Distill Template!");
  }

  /* 1. Flag that we're being loaded */
  if ("distill" in window && window.distill.templateIsLoading) {
    throw new Error(
      "Runlevel 1: Distill Template is getting loaded more than once, aborting!"
    );
  } else {
    window.distill.templateIsLoading = true;
    console.debug("Runlevel 1: Distill Template has started loading.");
  }

  /* 2. Add styles if they weren't added during prerendering */
  makeStyleTag(document);
  console.debug("Runlevel 1: Static Distill styles have been added.");
  console.debug("Runlevel 1->2.");
  window.distill.runlevel += 1;

  /* 3. Register Controller listener functions */
  /* Needs to happen before components to their connected callbacks have a controller to talk to. */
  for (const [functionName, callback] of Object.entries(Controller.listeners)) {
    if (typeof callback === "function") {
      document.addEventListener(functionName, callback);
    } else {
      console.error("Runlevel 2: Controller listeners need to be functions!");
    }
  }
  console.debug("Runlevel 2: We can now listen to controller events.");
  console.debug("Runlevel 2->3.");
  window.distill.runlevel += 1;

  /* 4. Register components */
  const components = [
    Abstract, Appendix, Article, Bibliography, Byline, Cite, CitationList, Code,
    Footnote, FootnoteList, FrontMatter, HoverBox, Title, DMath, References, TOC, Figure,
    Slider, Interstitial
  ];

  const distillComponents = [DistillHeader, DistillAppendix, DistillFooter];

  if (window.distill.runlevel < 2) {
    throw new Error("Insufficient Runlevel for adding custom elements!");
  }
  const allComponents = components.concat(distillComponents);
  for (const component of allComponents) {
    console.debug("Runlevel 2: Registering custom element: " + component.is);
    customElements.define(component.is, component);
  }

  console.debug(
    "Runlevel 3: Distill Template finished registering custom elements."
  );
  console.debug("Runlevel 3->4.");
  window.distill.runlevel += 1;

  // If template was added after DOMContentLoaded we may have missed that event.
  // Controller will check for that case, so trigger the event explicitly:
  if (domContentLoaded()) {
    Controller.listeners.DOMContentLoaded();
  }

  console.debug("Runlevel 4: Distill Template initialisation complete.");
  window.distill.templateIsLoading = false;
  window.distill.templateHasLoaded = true;
};

window.distill = { runlevel, initialize, templateIsLoading };

/* 0. Check browser feature support; synchronously polyfill if needed */
if (Polyfills.browserSupportsAllFeatures()) {
  console.debug("Runlevel 0: No need for polyfills.");
  console.debug("Runlevel 0->1.");
  window.distill.runlevel += 1;
  window.distill.initialize();
} else {
  console.debug("Runlevel 0: Distill Template is loading polyfills.");
  Polyfills.load(window.distill.initialize);
}
