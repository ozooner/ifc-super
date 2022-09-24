import resolve from '@rollup/plugin-node-resolve';
var browserSync = require("browser-sync");

var isWatching = process.argv.indexOf('-w') > -1;

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
    (isWatching && browserSync({server: "./out", files: "./out"}))
  ]
};
