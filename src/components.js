/* Static styles and other modules */
import { makeStyleTag } from './styles/styles';
makeStyleTag(document);

/* Components */
import { Abstract }         from './components/d-abstract';
import { Appendix }         from './components/d-appendix';
import { Article }          from './components/d-article';
import { Bibliography }     from './components/d-bibliography';
import { Byline }           from './components/d-byline';
import { Cite }             from './components/d-cite';
import { CitationList }     from './components/d-citation-list';
import { Code }             from './components/d-code';
import { Footnote }         from './components/d-footnote';
import { FootnoteList }     from './components/d-footnote-list';
import { FrontMatter }      from './components/d-front-matter';
import { DMath }            from './components/d-math';
import { References }       from './components/d-references';
import { TOC }              from './components/d-toc';
import { Figure }           from './components/d-figure';

const components = [
  Abstract, Appendix, Article, Bibliography, Byline, Cite, CitationList, Code,
  Footnote, FootnoteList, FrontMatter, DMath, References, TOC, Figure,
];

/* Distill website specific components */
import { DistillHeader } from './distill-components/distill-header';
import { DistillAppendix } from './distill-components/distill-appendix';
import { DistillFooter } from './distill-components/distill-footer';

const distillComponents = [
  DistillHeader, DistillAppendix, DistillFooter,
];

function defineComponents() {
  const allComponents = components.concat(distillComponents);
  for (const component of allComponents) {
    customElements.define(component.is, component);
  }
}

defineComponents();
