'use strict'

const path = require('path')
const through = require('through2')

let _dbust

const plugin = options => {

  if (typeof options !== 'undefined') _dbust.options(options)

  return through.obj((file, encoding, cb) => {
    const files = {}

    files[path.basename(file.revOrigPath)] = path.basename(file.path)

    _dbust.put(files)
    cb(null, file)
  })
}

module.exports = dbust => {
  _dbust = dbust
  return plugin
}
