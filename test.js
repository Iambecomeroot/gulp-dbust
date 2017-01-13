'use strict'

const assert = require('assert')
const path = require('path')
const load = (file) => require(path.join(__dirname, file))

const util = require('gulp-util')
const sinon = require('sinon')

const dbust = load('./plugin.js')

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

it('should call dbust with the file piped to it', (cb) => {
  const stub = sinon.stub().returns(new Promise((resolve) => resolve()))

  const stream = dbust(stub)

  stream.on('data', (file) => {
    try{
      assert(stub.calledWith({ 'unicorn.css': 'unicorn-d41d8cd98f.css' }), 'call with args provided')
      assert.deepEqual(jsonCopy(file), _file, 'don\'t mutate file')
      cb()
    }catch(err){ cb(err) }
  })

  stream.on('error', cb)

  stream.write(file)

  stream.end()
})


/*
*
* Test errors
*
*/

it('should throw new PluginError whenever dbust throws an error', (cb) => {
  const message = 'ENOENT: no such file or directory, open \'./manifest.json\''

  const stub = sinon.stub().returns(new Promise((resolve, reject) => reject({
    message,
    errno: -2,
    code: 'ENOENT',
    syscall: 'open',
    path: './manifest.json',
  })))

  const stream = dbust(stub)

  stream.on('data', () => {
    cb(new Error('No error thrown'))
  })

  stream.on('error', (err) => {
    try{
      assert.equal(err.message, message)
      assert.equal(err.plugin, 'gulp-dbust')
      cb()
    }catch(err){ cb(err) }
  })

  stream.write(file)

  stream.end()

})
