/* global it, should, describe, before, beforeEach, after, afterEach */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = require('chai').expect;
const distill = require('../dist/transforms.v2.js');

describe('Distill V2 (transforms)', function() {

  it('should export usesTemplateV2()', function() {
    expect(distill.usesTemplateV2).to.be.a('function');
  });

  describe('#usesTemplateV2()', function() {

    it('should detect v1', function() {
      const frag = JSDOM.fragment('<script src="https://distill.pub/template.v1.js"></script>');
      expect(distill.usesTemplateV2(frag)).to.be.false;
    });

    it('should detect v2', function() {
      const frag = JSDOM.fragment('<script src="https://distill.pub/template.v2.js"></script>');
      expect(distill.usesTemplateV2(frag)).to.be.true;
    });

    it('should error on unknown distill script', function() {
      const frag = JSDOM.fragment('<script src="https://distill.pub/unknown.v2.js"></script>');
      expect(()=> distill.usesTemplateV2(frag)).to.throw('unknown');
    });

    it('should error on no distill script', function() {
      const frag = JSDOM.fragment('<script src="https://code.jquery.com/jquery-3.2.1.js"></script>');
      expect(()=> distill.usesTemplateV2(frag)).to.throw('at all');
    });

  });


  it('should export render()', function() {
    expect(distill.render).to.be.a('function');
  });

  describe('#render()', function() {

    it('should extract metadata');
    it('should run transforms');

  });


  it('should export #distillify()', function() {
    expect(distill.distillify).to.be.a('function');
  });

  describe('#distillify()', function() {

    it('should ensure existence of header');
    it('should ensure existence of footer');
    it('should ensure existence of distill appendix');

  });

}); // describe 'Render'
