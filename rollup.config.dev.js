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

import resolve  from 'rollup-plugin-node-resolve';
import string   from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';
import buble    from 'rollup-plugin-buble';

// uncomment to show dependencies [1/2]
// import rollupGrapher from 'rollup-plugin-grapher'

const componentsConfig = {
  input: 'src/components.js',
  output: [{ format: 'umd', name: 'dl', file: 'dist/template.v2.js' }],
};

const transformsConfig = {
  input: 'src/transforms.js',
  output: [{ format: 'umd', name: 'dl', file: 'dist/transforms.v2.js', globals: {fs: 'fs'} }],
  external: ['fs']
};

const defaultConfig = {
  sourcemap: true,
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
    }),
    string({
      include: ['**/*.txt', '**/*.svg', '**/*.html', '**/*.css', '**/*.base64']
    }),
    commonjs(),

  ]
};

Object.assign(componentsConfig, defaultConfig);
Object.assign(transformsConfig, defaultConfig);

// transpile transforms so the node render script works…
transformsConfig.plugins.push(
  buble({
    target: { 'node': 6 }
  })
);

// uncomment to show dependencies [2/2]
// transformsConfig.plugins.push(
//   rollupGrapher({
//     dest: '/dev/null',
//     verbose: true
//   })
// );

export default [
  componentsConfig,
  transformsConfig,
];
