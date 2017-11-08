'use strict'

const spawn = require('cross-spawn')
const {
  flow,
  replace,
  trim,
} = require('lodash/fp')

const currentBranch = () => {
  const { stdout: branch } = spawn.sync(
    'git',
    ['rev-parse', '--abbrev-ref', 'HEAD'],
    { encoding: 'utf8' }
  )
  return trim(branch)
}

const currentRepo = () => {
  const { stdout: remoteUrl } = spawn.sync(
    'git',
    ['remote', 'get-url', 'origin'],
    { encoding: 'utf8' }
  )

  return flow(
    replace('git@github.com:')(''),
    replace('.git')(''),
    trim,
  )(remoteUrl)
}

module.exports = {
  currentBranch,
  currentRepo,
}
