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

/* global it, describe, before, beforeEach, after, afterEach */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = require("chai").expect;
const distill = require("../dist/transforms.v2.js");

// omitJSDOMErrors as JSDOM routinely can't parse modern CSS
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console, { omitJSDOMErrors: true });
const options = {
  runScripts: "outside-only",
  QuerySelector: true,
  virtualConsole: virtualConsole
};

describe("Distill V2 (transforms)", function() {
  it("should export its expected interface", function() {
    expect(distill.testing).to.be.an("object");
    expect(distill.usesTemplateV2).to.be.a("function");
    expect(distill.render).to.be.a("function");
    expect(distill.distillify).to.be.a("function");
  });

  describe("#usesTemplateV2()", function() {
    it("should detect v1", function() {
      const frag = JSDOM.fragment(
        '<script src="https://distill.pub/template.v1.js"></script>'
      );
      expect(distill.usesTemplateV2(frag)).to.be.false;
    });

    it("should detect v2", function() {
      const frag = JSDOM.fragment(
        '<script src="https://distill.pub/template.v2.js"></script>'
      );
      expect(distill.usesTemplateV2(frag)).to.be.true;
    });

    it("should detect local scripts as well", function() {
      const frag = JSDOM.fragment('<script src="/template.v2.js"></script>');
      expect(distill.usesTemplateV2(frag)).to.be.true;
    });

    it("should error on unknown distill script", function() {
      const frag = JSDOM.fragment(
        '<script src="https://distill.pub/template.v42.js"></script>'
      );
      expect(() => distill.usesTemplateV2(frag)).to.throw("unknown");
    });

    it("should error on no distill script", function() {
      const frag = JSDOM.fragment(
        '<script src="https://code.jquery.com/jquery-3.2.1.js"></script>'
      );
      expect(() => distill.usesTemplateV2(frag)).to.throw("at all");
    });
  });

  describe("#render()", function() {
    describe("should extract metadata", function() {
      it("should extract citations", function() {
        const dom = new JSDOM(
          '<d-cite key="test-citation-key">sth</d-cite>',
          options
        );
        const data = {};
        const extractCitations = distill.testing.extractors.get(
          "ExtractCitations"
        );
        expect(extractCitations).to.be.a("function");
        extractCitations(dom.window.document, data);
        expect(data).to.have.property("citations");
        const citations = data.citations;
        expect(citations).to.be.an.instanceof(Array);
        expect(citations).to.have.lengthOf(1);
        const citation = citations[0];
        expect(citation).to.equal("test-citation-key");
      });

      it("should extract bibliography", function() {
        const dom = new JSDOM(
          `
          <d-cite key="mercier2011humans">sth</d-cite>
          <d-bibliography>
            <script type="text/bibtex">
            @article{mercier2011humans,
            title={Why do humans reason? Arguments for an argumentative theory},
            author={Mercier, Hugo and Sperber, Dan},
            journal={Behavioral and brain sciences},
            volume={34},
            number={02},
            pages={57--74},
            year={2011},
            publisher={Cambridge Univ Press},
            doi={10.1017/S0140525X10000968}
            }
            </script>
          </d-bibliography>
          `,
          options
        );
        const data = {};
        const extractBibliography = distill.testing.extractors.get(
          "ExtractBibliography"
        );
        extractBibliography(dom.window.document, data);
        expect(data.bibliography).to.be.an.instanceof(Map);
        const entry = data.bibliography.get("mercier2011humans");
        expect(entry).to.be.an("object");
        expect(entry).to.have.property("year", "2011");
      });

      it("should extract front-matter");
    }); // metadata

    describe("should transform the DOM", function() {
      it("should add Google scholar citation information", function() {
        const dom = new JSDOM("", options);
        const data = {
          authors: [
            {
              firstName: "Frank",
              lastName: "Underwood",
              affiliation: "Google Brain",
              affiliationURL: "https://g.co/brain"
            },
            {
              firstName: "Shan",
              lastName: "Carter",
              affiliation: "Google Brain",
              affiliationURL: "https://g.co/brain"
            }
          ],
          doiSuffix: "test-doi-suffix"
        };
        const firstAuthorName =
          data.authors[0].firstName + " " + data.authors[0].lastName;
        const GSfirstAuthorName =
          data.authors[0].lastName + ", " + data.authors[0].firstName;

        const meta = distill.testing.transforms.get("Meta");
        expect(meta).to.be.a("function");

        meta(dom.window.document, data);
        const metaTags = dom.window.document.querySelectorAll("meta");
        expect(metaTags).to.not.be.empty;

        // Google Scholar
        const GSAuthorTags = Array.prototype.filter.call(metaTags, tag => {
          return tag.name === "citation_author";
        });
        expect(GSAuthorTags).to.have.lengthOf(2);
        const GSFirstAuthorTag = GSAuthorTags[0];

        expect(GSFirstAuthorTag.content).to.equal(GSfirstAuthorName);

        // Schema.org Author tags
        const SOAuthorTags = Array.prototype.filter.call(metaTags, tag => {
          return tag.getAttribute("property") === "article:author";
        });
        expect(SOAuthorTags).to.have.lengthOf(2);
        const SOFirstAuthorTag = SOAuthorTags[0];
        expect(SOFirstAuthorTag.content).to.equal(firstAuthorName);
      });

      it("given already correct data, it should add Google scholar references information", function() {
        const dom = new JSDOM("", options);
        const data = {
          doiSuffix: "test-doi-suffix",
          citations: ["test-citation-key"],
          bibliography: new Map([
            [
              "test-citation-key",
              {
                title:
                  "Why do humans reason? Arguments for an argumentative theory",
                author: "Mercier, Hugo and Sperber, Dan",
                journal: "Behavioral and brain sciences",
                volume: 34,
                number: 2
              }
            ]
          ])
        };
        const meta = distill.testing.transforms.get("Meta");
        expect(meta).to.be.a("function");
        meta(dom.window.document, data);
        const metaTags = [].slice.call(
          dom.window.document.querySelectorAll(
            'meta[name="citation_reference"]'
          )
        );
        expect(metaTags).to.not.be.empty;
      });

      it("given an arxiv article, it should add a special Google scholar arxiv citation", function() {
        const dom = new JSDOM("", options);
        const data = {
          doiSuffix: "test-doi-suffix",
          citations: ["dumoulin2016guide"],
          bibliography: new Map([
            [
              "dumoulin2016guide",
              {
                title: "A guide to convolution arithmetic for deep learning",
                author: "Dumoulin, Vincent and Visin, Francesco",
                journal: "arXiv preprint arXiv:1603.07285",
                year: "2016",
                url: "https://arxiv.org/pdf/1603.07285.pdf"
              }
            ]
          ])
        };

        const meta = distill.testing.transforms.get("Meta");
        expect(meta).to.be.a("function");
        meta(dom.window.document, data);

        const metaTags = [].slice.call(
          dom.window.document.querySelectorAll(
            'meta[name="citation_reference"]'
          )
        );
        expect(metaTags).to.not.be.empty;

        const metaTag = metaTags[0];
        expect(metaTag).to.have.property("content");

        const content = metaTag.content;
        expect(content).to.include("citation_title");
        expect(content).to.include("citation_author");
        expect(content.match(/citation_author=/g).length).to.equal(2);
        expect(content).to.include("citation_publication_date");
        expect(content).to.include("citation_arxiv_id");
        expect(content).to.not.include("journal");
      });

      it("given only a DOM (and publish data), it should add Google scholar references information", function() {
        const dom = new JSDOM(
          `
          <d-cite key="mercier2011humans">sth</d-cite>
          <d-bibliography>
            <script type="text/bibtex">
            @article{mercier2011humans,
            title={Why do humans reason? Arguments for an argumentative theory},
            author={Mercier, Hugo and Sperber, Dan},
            journal={Behavioral and brain sciences},
            volume={34},
            number={02},
            pages={57--74},
            year={2011},
            publisher={Cambridge Univ Press},
            doi={10.1017/S0140525X10000968}
            }
            </script>
          </d-bibliography>
          `,
          options
        );
        const data = { publishedDate: new Date(), updatedDate: new Date() };
        distill.render(dom.window.document, data, false);
        const metaTags = [].slice.call(
          dom.window.document.querySelectorAll(
            'meta[name="citation_reference"]'
          )
        );
        expect(metaTags).to.not.be.empty;
      });
    });
  }); // render

  it("should export #distillify()", function() {
    expect(distill.distillify).to.be.a("function");
  });

  describe("#distillify()", function() {
    it("should ensure existence of header");
    it("should ensure existence of footer");
    it("should ensure existence of distill appendix");
  });
}); // describe 'Transform'
