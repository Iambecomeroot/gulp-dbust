'use strict'

const path = require('path')

const through = require('through2')
const util = require('gulp-util')
const PluginError = util.PluginError

module.exports = (dbust) =>
  through.obj((file, encoding, cb) => {
    const files = {}

    files[path.basename(file.revOrigPath)] = path.basename(file.path)

    dbust(files)
      .then(() => {
        cb(null, file)
      })
      .catch((err) => {
        if(typeof err === 'string') err = new Error(err)
        cb(new PluginError('gulp-dbust', err.message))
      })
  })
