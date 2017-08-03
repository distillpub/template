import { FrontMatter } from '../transforms/data';
import { collectCitations } from './d-cite';

const frontMatter = new FrontMatter();

// set up global controller object
/* functions whose names start with 'on' will be registered as listeners on d-article */
export const Controller = {

  frontMatter: frontMatter,
  waitingOn: {
    bibliography: [],
    citations: [],
  },
  listeners: {

    onCiteKeyCreated(event) {
      const [citeTag, keys] = event.detail;

      // ensure we have citations
      if (frontMatter.citations.length === 0) {
        console.debug('onCiteKeyCreated, but unresolved dependency ("citations"). Enqueing.');
        Controller.waitingOn.citations.push(() => Controller.listeners.onCiteKeyCreated(event));
        return;
      }

      // ensure we have a loaded bibliography
      if (frontMatter.bibliography.size === 0) {
        console.debug('onCiteKeyCreated, but unresolved dependency ("bibliography"). Enqueing.');
        Controller.waitingOn.bibliography.push(() => Controller.listeners.onCiteKeyCreated(event));
        return;
      }

      const numbers = keys.map( key => frontMatter.citations.indexOf(key) );
      citeTag.numbers = numbers;
      const entries = keys.map( key => frontMatter.bibliography.get(key) );
      citeTag.entries = entries;
    },

    onCiteKeyChanged(event) {
      const [citeTag, keys] = event.detail;

      // update citations
      frontMatter.citations = collectCitations();
      for (const waitingCallback of Controller.waitingOn.citations) {
        waitingCallback();
      }

      // update bibliography
      const bibliographyTag = document.querySelector('d-bibliography');
      const bibliographyEntries = new Map(frontMatter.citations.map( citationKey => {
        return [citationKey, frontMatter.bibliography.get(citationKey)];
      }));
      bibliographyTag.entries = bibliographyEntries;

      const citeTags = document.querySelectorAll('d-cite');
      for (const citeTag of citeTags) {
        const keys = citeTag.keys;
        const numbers = keys.map( key => frontMatter.citations.indexOf(key) );
        citeTag.numbers = numbers;
        const entries = keys.map( key => frontMatter.bibliography.get(key) );
        citeTag.entries = entries;
      }

      const numbers = keys.map( key => frontMatter.citations.indexOf(key) );
      citeTag.numbers = numbers;
      const entries = keys.map( key => frontMatter.bibliography.get(key) );
      citeTag.entries = entries;
    },

    onBibliographyChanged(event) {
      const bibliographyTag = event.target;
      const bibliography = event.detail;

      frontMatter.bibliography = bibliography;
      for (const waitingCallback of Controller.waitingOn.bibliography) {
        waitingCallback();
      }

      // ensure we have citations
      if (frontMatter.citations.length === 0) {
        console.debug('onBibliographyChanged, but unresolved dependency ("citations"). Enqueing.');
        Controller.waitingOn.citations.push(() => Controller.listeners.onBibliographyChanged(event));
        return;
      }

      const entries = new Map(frontMatter.citations.map( citationKey => {
        return [citationKey, frontMatter.bibliography.get(citationKey)];
      }));
      bibliographyTag.entries = entries;
    },

    onFootnoteChanged(event) {
      const footnote = event.detail;
      //TODO: optimize to only update current footnote
      const footnotesList = document.querySelector('d-footnote-list');
      if (footnotesList) {
        const footnotes = document.querySelectorAll('d-footnote');
        footnotesList.footnotes = footnotes;
      }
    },

    onFrontMatterChanged(event) {
      const data = event.detail;
      frontMatter.mergeFromYMLFrontmatter(data);

      const appendix = document.querySelector('distill-appendix');
      appendix.frontMatter = frontMatter;

      const byline = document.querySelector('d-byline');
      byline.frontMatter = frontMatter;
    },

    DOMContentLoaded(event) {
      console.debug('DOMContentLoaded.');

      const frontMatterTag = document.querySelector('d-front-matter');
      const data = frontMatterTag.parse();
      Controller.listeners.onFrontMatterChanged({detail: data});

      console.debug('Resolving "citations" dependency due to initial DOM load.');
      frontMatter.citations = collectCitations();
      for (const waitingCallback of Controller.waitingOn.citations) {
        waitingCallback();
      }

      const footnotesList = document.querySelector('d-footnote-list');
      if (footnotesList) {
        const footnotes = document.querySelectorAll('d-footnote');
        footnotesList.footnotes = footnotes;
      }

    }

  }, // listeners

  update: {
    cite(element) {

    },
    footnoteList(element) {

    }
  }

} // Controller
