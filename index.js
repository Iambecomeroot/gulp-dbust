'use strict'

const dbust = require('dbust')
const plugin = require(__dirname + '/plugin.js')

module.exports = plugin(dbust)

