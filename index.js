'use strict'

const path = require('path')
const load = (file) => require(path.join(__dirname, file))

module.exports = (options) => {
  const dbust = require('dbust')(options)
  const plugin = load('./plugin.js')

  return plugin(dbust)
}
