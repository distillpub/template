import copy     from 'rollup-plugin-copy';
import resolve  from 'rollup-plugin-node-resolve';
import string   from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';
// import babili   from 'rollup-plugin-babili';

const componentsConfig = {
  entry: 'src/components.js',
  targets: [{format: 'umd', moduleName: 'dl', dest: 'dist/components.js'}],
};

const transformsConfig = {
  entry: 'src/transforms.js',
  targets: [{format: 'umd', moduleName: 'dl', dest: 'dist/transforms.js'}],
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
    // babili({
    //   comments: false, // means: *remove* comments
    //   sourceMap: true,
    // })
  ]
};

Object.assign(componentsConfig, defaultConfig);
componentsConfig.plugins.push(copy({
  './node_modules/katex/dist/fonts': 'dist/fonts',
  './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js': 'dist/webcomponents-lite.js',
  './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js.map': 'dist/webcomponents-lite.js.map',
}));
Object.assign(transformsConfig, defaultConfig);

export default [
  componentsConfig,
  transformsConfig,
];
