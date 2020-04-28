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

import resolve from "rollup-plugin-node-resolve";
import string from "rollup-plugin-string";
import commonjs from "rollup-plugin-commonjs";
import babel from '@rollup/plugin-babel';

// uncomment to show dependencies [1/2]
// import rollupGrapher from 'rollup-plugin-grapher'

const defaultConfig = {
  plugins: [
    resolve({
      jsnext: true,
      browser: true
    }),
    commonjs(),
    string({
      include: ["**/*.txt", "**/*.svg", "**/*.html", "**/*.css", "**/*.base64"]
    })
  ]
};

const componentsConfig = {
  input: "src/components.js",
  output: [{ format: "umd", name: "dl", file: "dist/template.v2.js", sourcemap: true }],
  plugins: [
    babel({
      "babelHelpers": "bundled",
      "targets": "defaults"
    })
  ]
};

const transformsConfig = {
  input: "src/transforms.js",
  output: [
    {
      format: "umd",
      name: "dl",
      file: "dist/transforms.v2.js",
      globals: { fs: "fs" },
      sourcemap: true,
    }
  ],
  external: ["fs"],
  plugins: [
    babel({
      "babelHelpers": "bundled",
      "targets": {
        "node": "current"
      }
    })
  ]
};

Object.assign(componentsConfig, defaultConfig);
Object.assign(transformsConfig, defaultConfig);

export default [componentsConfig, transformsConfig];
