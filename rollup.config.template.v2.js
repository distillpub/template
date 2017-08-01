import resolve  from 'rollup-plugin-node-resolve';
import string   from 'rollup-plugin-string';
import commonjs from 'rollup-plugin-commonjs';
import babili   from 'rollup-plugin-babili';
import gzip     from 'rollup-plugin-gzip';
import serve    from 'rollup-plugin-serve';

const PORT = 8080;
console.log(`opening http://localhost:${PORT} .../`);

export default {
  entry: 'template.v2.js',
  sourceMap: true,
  targets: [
    {
      format: 'umd',
      moduleName: 'dl',
      dest: `dist/template.v2.js`,
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
    commonjs(),
    // babili({
    //   comments: false, // means: *remove* comments
    //   sourceMap: true,
    // }),
    // gzip(), // just for testing -- firebase CDN gzips automatically
    serve({
      port: PORT,
      open: true,
    })
  ]
};
