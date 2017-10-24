'use strict'

const assert = require('assert')
const { forEach } = require('lodash/fp')

const envVars = [
  'NODE_ENV',
]

describe('envVars', () => {
  forEach(name => {
    it(name, () => {
      assert.notEqual(process.env[name], null, `${name} is not set`)
    })
  })(envVars)
})
