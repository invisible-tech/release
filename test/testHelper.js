'use strict'

const appModulePath = require('app-module-path')

appModulePath.addPath(`${__dirname}/..`)

require('test/helpers/loadEnv')
