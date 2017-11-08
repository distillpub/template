import { Controller } from './controller';

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

const distillMain = function() {

  if (window.distillRunlevel < 1) {
    throw new Error('Insufficient Runlevel for Distill Template!');
  }

  /* 1. Flag that we're being loaded */
  if ('distillTemplateIsLoading' in window && window.distillTemplateIsLoading) {
    throw new Error('Runlevel 1: Distill Template is getting loaded more than once, aborting!');
  } else {
    window.distillTemplateIsLoading = true;
    console.info('Runlevel 1: Distill Template has started loading.');
  }

  /* 2. Add styles if they weren't added during prerendering */
  makeStyleTag(document);
  console.info('Runlevel 1: Static Distill styles have been added.');
  console.info('Runlevel 1->2.');
  window.distillRunlevel += 1;

  /* 3. Register components */
  /* Article will register controller which takes control from there */
  const components = [
    Abstract, Appendix, Article, Bibliography, Byline, Cite, CitationList, Code,
    Footnote, FootnoteList, FrontMatter, HoverBox, Title, DMath, References, TOC, Figure,
    Slider, Interstitial
  ];

  const distillComponents = [
    DistillHeader, DistillAppendix, DistillFooter,
  ];

  if (window.distillRunlevel < 2) {
    throw new Error('Insufficient Runlevel for adding custom elements!');
  }
  const allComponents = components.concat(distillComponents);
  for (const component of allComponents) {
    console.info('Runlevel 2: Registering custom element: ' + component.is);
    customElements.define(component.is, component);
  }

  console.info('Runlevel 2: Distill Template finished registering custom elements.');
  console.info('Runlevel 2->3.');
  window.distillRunlevel += 1;

  /* 4. Register Controller listener functions */
  for (const [functionName, callback] of Object.entries(Controller.listeners)) {
    if (typeof callback === 'function') {
      document.addEventListener(functionName, callback);
    } else {
      console.error('Runlevel 3: Controller listeners need to be functions!');
    }
  }
  console.info('Runlevel 3: We can now listen to controller events.');
  console.info('Runlevel 3->4.');
  window.distillRunlevel += 1;

  console.info('Runlevel 4: Distill Template initialisation complete.');
};

window.distillRunlevel = 0;
/* 0. Check browser feature support; synchronously polyfill if needed */
if (Polyfills.browserSupportsAllFeatures()) {
  console.info('Runlevel 0: No need for polyfills.');
  console.info('Runlevel 0->1.');
  window.distillRunlevel += 1;
  distillMain();
} else {
  console.info('Runlevel 0: Distill Template is loading polyfills.');
  Polyfills.load(distillMain);
}
