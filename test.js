/* global it */

'use strict'

const assert = require('assert')

const util = require('gulp-util')
const sinon = require('sinon')

const dbust = require('dbust')
const plugin = require(__dirname + '/plugin.js')

// Function to copy an object using JSON.parse(JSON.stringify)
const jsonCopy = (obj) => JSON.parse(JSON.stringify(obj))


//
// Create file for testing
//

const file = new util.File({ path: 'unicorn-d41d8cd98f.css', contents: new Buffer('') })
file.revOrigPath = 'unicorn.css'

// Save for later
const _file = jsonCopy(file)


/*
*
* Test when everything is wonderful
*
*/

it('should call dbust with the file piped to it', cb => {
  const put = sinon.stub().returns(Promise.resolve())

  const stream = plugin({ put })()

  stream.on('data', file => {
    try {
      assert(put.calledWith({ 'unicorn.css': 'unicorn-d41d8cd98f.css' }), 'call with args provided')
      assert.deepEqual(jsonCopy(file), _file, 'don\'t mutate file')
      cb()
    } catch(err) { cb(err) }
  })

  stream.on('error', cb)

  stream.write(file)

  stream.end()
})

it('should act as a proxy for options', cb => {

  plugin(dbust)({
    base: '/some/weird/path',
    manifest: 'not-manifest.json',
  })

  assert.deepEqual(dbust._getOptions(), {
    base: '/some/weird/path',
    manifest: '/some/weird/path/not-manifest.json',
  })
  cb()
})

/*
*
* Test errors
*
*/

// it('should throw new PluginError whenever dbust throws an error', (cb) => {
  // const message = 'ENOENT: no such file or directory, open \'./manifest.json\''

  // const stub = sinon.stub().returns(new Promise((resolve, reject) => reject({
    // message,
    // errno: -2,
    // code: 'ENOENT',
    // syscall: 'open',
    // path: './manifest.json',
  // })))

  // const stream = plugin(stub)

  // stream.on('data', () => {
    // cb(new Error('No error thrown'))
  // })

  // stream.on('error', (err) => {
    // try{
      // assert.equal(err.message, message)
      // assert.equal(err.plugin, 'gulp-dbust')
      // cb()
    // }catch(err){ cb(err) }
  // })

  // stream.write(file)

  // stream.end()

// })
