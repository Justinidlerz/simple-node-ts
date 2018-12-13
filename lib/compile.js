'use strict';

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const compilerOptions = ts.readConfigFile(path.join(__dirname, '../tsconfig.json'), p => {
  return fs.readFileSync(p, 'utf-8');
}).config;

require.extensions['.ts'] = function (m, filename) {
  const source = fs.readFileSync(filename).toString();
  try {
    let result = ts.transpile(source, compilerOptions['compilerOptions'], filename);
    return m._compile(result, filename);
  } catch (err) {
    console.error('Error while running script "' + filename + '":');
    console.error(err.stack);
    throw err;
  }
};