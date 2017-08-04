/* Static styles and other modules */
import './styles/styles';

/* Components */
import { Abstract }         from './components/d-abstract';
import { Acknowledgements } from './components/d-acknowledgements';
import { Appendix }         from './components/d-appendix';
import { Article }          from './components/d-article';
import { Bibliography }     from './components/d-bibliography';
import { Byline }           from './components/d-byline';
import { Cite }             from './components/d-cite';
import { Code }             from './components/d-code';
import { Footnote }         from './components/d-footnote';
import { FootnoteList }     from './components/d-footnote-list';
import { FrontMatter }      from './components/d-front-matter';
import { DMath }            from './components/d-math';
import { References }       from './components/d-references';
import { Title }            from './components/d-title';
import { TOC }              from './components/d-toc';

const components = [
  Abstract, Acknowledgements, Appendix, Article, Bibliography,
  Byline, Cite, Code, Footnote, FootnoteList, FrontMatter, DMath,
  References, Title, TOC,
];

/* Distill website specific components */
import { DistillHeader } from './distill-components/distill-header';
import { DistillAppendix } from './distill-components/distill-appendix';

const distillComponents = [
  DistillHeader, DistillAppendix,
];

function defineComponents() {
  const allComponents = components.concat(distillComponents);
  for (const component of allComponents) {
    customElements.define(component.is, component);
  }
}

defineComponents();
