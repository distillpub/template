/* global it, should, describe */

// Test format: https://mochajs.org/#bdd
// Assertion format: http://chaijs.com/api/bdd/

let expect = require('chai').expect;
let jsdom = require('jsdom');
    // let distill = require('../dist/template.v1.js');

describe.skip('Distill v1', function() {

  describe('render', function() {
    it('Should have a render function.', function() {
      expect(distill.render).to.be.an.instanceof(Function);
    });
  });

  //
  // html
  //
  describe.skip('html', function() {
    it('Should have a html function.', function() {
      expect(distill.html).to.be.an.instanceof(Function);
    });
    it('Should add a language attribute to html element, if not present.', function() {
      var doc = jsdom.jsdom('');
      let before = jsdom.serializeDocument(doc);
      distill.html(doc, {});
      let after = jsdom.serializeDocument(doc);
      expect(after).to.match(new RegExp('<html lang="en">'));
    });
    it('Should not add a language attribute to html element, if already present.', function() {
      var doc = jsdom.jsdom('<html lang="ab">');
      let before = jsdom.serializeDocument(doc);
      distill.html(doc, {});
      let after = jsdom.serializeDocument(doc);
      expect(after).to.not.match(new RegExp('lang="en"'));
    });
    it('Should add a meta charset tag, if not present.', function() {
      var doc = jsdom.jsdom('');
      let before = jsdom.serializeDocument(doc);
      distill.html(doc, {});
      let after = jsdom.serializeDocument(doc);
      expect(after).to.match(new RegExp('<meta charset="utf-8">'));
    });
    it('Should add a meta viewport tag, if not present.', function() {
      var doc = jsdom.jsdom('');
      let before = jsdom.serializeDocument(doc);
      distill.html(doc, {});
      let after = jsdom.serializeDocument(doc);
      expect(after).to.match(new RegExp('<meta name="viewport" content="width=device-width, initial-scale=1">'));
    });
  });

  //
  // styles
  //
  describe.skip('styles', function() {
    it('Should have a styles function.', function() {
      expect(distill.styles).to.be.an.instanceof(Function);
    });
  })
});
