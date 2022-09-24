import resolve from '@rollup/plugin-node-resolve';
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
    replaceHtmlVars({
        files: 'out/index.html',
        from: /bundle.js\?v=\d+/g,
        to: 'bundle.js?v=' + Date.now(),
    }),
    (isWatching && browserSync({server: "./out", files: "./out"}))
  ]
};
