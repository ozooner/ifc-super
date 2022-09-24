import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

var browserSync = require("browser-sync");
var replaceHtmlVars = require('rollup-plugin-replace-html-vars')

var isWatching = process.argv.indexOf('-w') > -1;

var revision = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString().trim()

console.log("REV", revision)

export default {
  input: './app.js',
  output: [
    {
      format: 'esm',
      file: './out/bundle.js'
    },
  ],
  plugins: [
    resolve(),
    copy({
      targets: [
        {src: "index.html", dest: './out', transform: (contents) => {
          return contents.toString().replace('__REVISION__', revision).replace(/__TIMESTAMP__/g, Date.now());
        }},
      ],
      verbose: true
    }),
    (isWatching && browserSync({server: "./out", files: "./out"}))
  ]
};
