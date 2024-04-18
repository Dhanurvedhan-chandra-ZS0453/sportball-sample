const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
//   noParse: function (content) {
//     return /express/.test(content);
//   },
// externals: {
//     express: "require('express')"
//   },
  target: 'node', 
  externals: [nodeExternals()],
//   externals: ['dtrace-provider', 'pg', 'sqlite3', 'tedious', 'pg-hstore'],
//   externals: ['dtrace-provider'],
  mode: 'development', // 'production',
  entry: './app.js',
  output: {
    clean: true, // Clean the output directory before emit.
    compareBeforeEmit: true,
    ignoreBrowserWarnings: true,
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
  },
  // Additional configuration goes here
};