import { FrontMatter } from './front-matter';
import { collectCitations } from './components/d-cite';
import { parseFrontmatter } from './components/d-front-matter';

const frontMatter = new FrontMatter();

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
      if (!frontMatter.citationsCollected) {
        // console.debug('onCiteKeyCreated, but unresolved dependency ("citations"). Enqueing.');
        Controller.waitingOn.citations.push(() => Controller.listeners.onCiteKeyCreated(event));
        return;
      }

      // ensure we have a loaded bibliography
      if (!frontMatter.bibliographyParsed) {
        // console.debug('onCiteKeyCreated, but unresolved dependency ("bibliography"). Enqueing.');
        Controller.waitingOn.bibliography.push(() => Controller.listeners.onCiteKeyCreated(event));
        return;
      }

      const numbers = keys.map( key => frontMatter.citations.indexOf(key) );
      citeTag.numbers = numbers;
      const entries = keys.map( key => frontMatter.bibliography.get(key) );
      citeTag.entries = entries;
    },

    onCiteKeyChanged(event) {
      // const [citeTag, keys] = event.detail;

      // update citations
      frontMatter.citations = collectCitations();
      frontMatter.citationsCollected = true;
      for (const waitingCallback of Controller.waitingOn.citations.slice()) {
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

    },

    onCiteKeyRemoved(event) {
      Controller.listeners.onCiteKeyChanged(event);
    },

    onBibliographyChanged(event) {
      const bibliographyTag = event.target;
      const bibliography = event.detail;

      frontMatter.bibliography = bibliography;
      frontMatter.bibliographyParsed = true;
      for (const waitingCallback of Controller.waitingOn.bibliography.slice()) {
        waitingCallback();
      }

      // ensure we have citations
      if (!frontMatter.citationsCollected) {
        Controller.waitingOn.citations.push( function() {
          Controller.listeners.onBibliographyChanged({target: event.target, detail: event.detail});
        });
        return;
      }

      const entries = new Map(frontMatter.citations.map( citationKey => {
        return [citationKey, frontMatter.bibliography.get(citationKey)];
      }));

      bibliographyTag.entries = entries;
    },

    onFootnoteChanged() {
      // const footnote = event.detail;
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
      if (appendix) {
        appendix.frontMatter = frontMatter;
      }

      const byline = document.querySelector('d-byline');
      if (byline) {
        byline.frontMatter = frontMatter;
      }
    },

    DOMContentLoaded() {
      // console.debug('DOMContentLoaded.');

      const frontMatterTag = document.querySelector('d-front-matter');
      const data = parseFrontmatter(frontMatterTag);
      Controller.listeners.onFrontMatterChanged({detail: data});

      // console.debug('Resolving "citations" dependency due to initial DOM load.');
      frontMatter.citations = collectCitations();
      frontMatter.citationsCollected = true;
      for (const waitingCallback of Controller.waitingOn.citations.slice()) {
        waitingCallback();
      }

      const footnotesList = document.querySelector('d-footnote-list');
      if (footnotesList) {
        const footnotes = document.querySelectorAll('d-footnote');
        footnotesList.footnotes = footnotes;
      }
    }

  }, // listeners

}; // Controller
