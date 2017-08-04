import copy     from 'rollup-plugin-copy';
import resolve  from 'rollup-plugin-node-resolve';
import string   from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';
import babili   from 'rollup-plugin-babili';

const PORT = 8080;

console.log(`opening http://localhost:${PORT} .../`);

export default {
  entry: 'src/components.js',
  sourceMap: true,
  targets: [
    {
      format: 'iife',
      moduleName: 'dl',
      dest: 'dist/components.js',
    }
  ],
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
    }),
    string({
      include: ['**/*.txt', '**/*.svg', '**/*.html', '**/*.css', '**/*.base64']
    }),
    commonjs(),
    babili({
      comments: false, // means: *remove* comments
      sourceMap: true,
    }),
    copy({
      'node_modules/katex/dist/fonts': 'examples/fonts',
    }),
  ]
};
