const path = require('path')
const version = require('../../package.json').version

module.exports.banner =
  '/*!\n' +
  ' * Stem UI v' + version + ' (https://github.com/preusx/vue-stem-ui)\n' +
  ' * (c) ' + new Date().getFullYear() + ' Alex Tkachenko\n' +
  ' * Released under the MIT License.\n' +
  ' */'

module.exports.resolve = x => path.normalize(path.join(__dirname, '..', '..', x))

module.exports.isProduction = process.env.NODE_ENV === 'production'