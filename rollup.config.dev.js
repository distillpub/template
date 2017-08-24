import resolve  from 'rollup-plugin-node-resolve';
import string   from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';

const componentsConfig = {
  entry: 'src/components.js',
  targets: [{format: 'umd', moduleName: 'dl', dest: 'dist/template.v2.js'}],
};

const transformsConfig = {
  entry: 'src/transforms.js',
  targets: [{format: 'umd', moduleName: 'dl', dest: 'dist/transforms.v2.js'}],
};

const defaultConfig = {
  sourceMap: true,
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

export default [
  componentsConfig,
  transformsConfig,
];
