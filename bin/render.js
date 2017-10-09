#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const program = require('commander');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const transforms = require('../dist/transforms.v2.js');

program
  .version('1.0.0')
  .description('Pre-renders distill articles for publication.')
  .usage('-i <input path> -o <output path>')
  .option('-i, --input_path <path>', 'path to input HTML file.')
  .option('-o, --output_path <path>', 'path to write rendered HTML file to.')
  .parse(process.argv);

const virtualConsole = new jsdom.VirtualConsole();
// omitJSDOMErrors as JSDOM routinely can't parse modern CSS
virtualConsole.sendTo(console, { omitJSDOMErrors: true });

const options = { runScripts: 'outside-only', QuerySelector: true, virtualConsole: virtualConsole };
JSDOM.fromFile(program.input, options).then(dom => {
  const window = dom.window;
  const document = window.document;

  const data = new transforms.FrontMatter;
  data.inputHTMLPath = program.input; // may be needed to resolve relative links!
  data.inputDirectory = path.dirname(program.input);
  transforms.render(document, data);
  transforms.distillify(document, data);

  const transformedHtml = dom.serialize();
  fs.writeFileSync(program.output, transformedHtml);
}).catch(console.error);
