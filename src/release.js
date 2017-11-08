'use strict'

const appModulePath = require('app-module-path')

appModulePath.addPath(`${__dirname}/..`)
appModulePath.enableForDir(`${__dirname}`)

require('dotenv').config()
const assert = require('assert')
const finder = require('find-package-json')
const github = require('octonode')
const { isEmpty } = require('lodash/fp')

const { lastChangelogUpdate } = require('@invisible/changelog-update')
const {
  currentBranch,
  currentRepo,
} = require('./helpers')

const pkg = finder().next().value || {}

const run = async ({ githubToken, draft = false, changelogFile = 'CHANGELOG.md' } = {}) => {
  assert(githubToken, 'GITHUB_TOKEN is required.')
  assert(pkg.version, 'The field version on package.json is missing.')

  if (currentBranch() !== 'master') {
    return {
      pass: true,
      msg: 'Not on master branch, skipping.',
    }
  }

  const notes = lastChangelogUpdate({ changelogFile })
  if (isEmpty(notes)) console.log('release: release note not found.')

  const client = github.client(githubToken)
  const repo = currentRepo()
  const ghrepo = client.repo(repo)

  try {
    await ghrepo.releaseAsync({
      tag_name: `v${pkg.version}`,
      target_commitish: 'master',
      name: `v${pkg.version}`,
      draft,
      body: notes,
    })
  } catch (err) {
    return {
      pass: false,
      msg: err.message,
    }
  }

  return {
    pass: true,
    msg: 'new release created',
  }
}

module.exports = run
