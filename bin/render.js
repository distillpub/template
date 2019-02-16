#!/usr/bin/env node

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

const path = require('path');
const fs = require('fs');
const program = require('commander');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const transforms = require('../dist/transforms.v2.js');

program
  .version('1.0.0')
  .description('Pre-renders distill articles for publication.')
  .usage('-i <input_path> -o <output_path>')
  .option('-i, --input-path <path>', 'path to input HTML file.')
  .option('-o, --output-path <path>', 'path to write rendered HTML file to.')
  .parse(process.argv);

const virtualConsole = new jsdom.VirtualConsole();
// omitJSDOMErrors as JSDOM routinely can't parse modern CSS
virtualConsole.sendTo(console, { omitJSDOMErrors: true });

const options = { runScripts: 'outside-only', QuerySelector: true, virtualConsole: virtualConsole };
JSDOM.fromFile(program.inputPath, options).then(dom => {
  const window = dom.window;
  const document = window.document;
  const HTMLElement = window.HTMLElement;

  const data = new transforms.FrontMatter;
  data.inputHTMLPath = program.inputPath; // may be needed to resolve relative links!
  data.inputDirectory = path.dirname(program.inputPath);
  transforms.render(document, data);
  transforms.distillify(document, data);

  const transformedHtml = dom.serialize();
  fs.writeFileSync(program.outputPath, transformedHtml);
}).catch(console.error);
