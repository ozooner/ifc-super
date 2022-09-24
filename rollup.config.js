import resolve from '@rollup/plugin-node-resolve';

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
  ]
};
