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

import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';

// const PORT = 8080;
// console.log(`open http://localhost:${PORT}/`);

export default {
  entry: 'index.js',
  sourceMap: true,
  targets: [
    {
      format: 'umd',
      moduleName: 'dl',
      dest: `dist/template.v1.js`,
    }
  ],
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
    }),
    string({
      include: ["**/*.txt", "**/*.svg", "**/*.html", "**/*.css", "**/*.base64"]
    }),
    buble({
      exclude: 'node_modules',
      target: { chrome: 52, safari: 8, edge: 13, firefox: 48, }
    }),
    commonjs(),
    // uglify(),
    // liveReload(),
    // serve({port: PORT}),
  ]
};
