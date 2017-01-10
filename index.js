'use strict'

const path = require('path')

const through = require('through2')

module.exports = (options) => {
  if(!options || typeof options !== 'object') options = {}

  if(!('base' in options)) options.base = path.dirname(module.parent.filename)

  const dbust = require('dbust')(options)

  return through.obj((file, encoding, cb) => {
    const files = {}

    files[path.basename(file.revOrigPath)] = path.basename(file.path)

    dbust(files, cb, file)
  })
}
