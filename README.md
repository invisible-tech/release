# @invisible/release

[![CircleCI](https://circleci.com/gh/invisible-tech/release/tree/master.svg?style=svg)](https://circleci.com/gh/invisible-tech/release/tree/master)

Provides a helper method to publish a new release to Github.

## Install

```
npm install @invisible/release
# or
yarn add @invisible/release
```

## Usage

### Programmatically

```javascript
  'use strict'
  const release = require('@invisible/release')

  const { GITHUB_TOKEN } = process.env

  // draft is set to false by default.
  // changelogFile is set to CHANGELOG.md by default
  release({ githubToken: GITHUB_TOKEN, draft: true, changelogFile: 'ANNOUNCEMENTS.md' })
    .then(({ pass, msg }) => {
      if (msg) console.log(`release: ${msg}`)
      if (pass) return process.exit(0)
      return process.exit(1)
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
```

### Hook scripts

#### `release`

1. See [`circle.yml`](circle.yml) for an example of how to integrate it. Details below:

  If you're using circle CI, add `release` to `deployment` section of your project `circle.yml`.

  ```yaml
    # It would look something like this:
    deployment:
      production:
        branch: master
        commands:
          - release
  ```

  Add `GITHUB_TOKEN` as environmental variable to your project on circleCI!
  This package will optionally load `dotenv` if it's present, so you may add this to your `.env` file as well.

  You can also run it at any time from your CLI.

  ```bash
  $ export GITHUB_TOKEN=XXXXXXXXXXXXXXXXXXXXX
  $ release
  $ release --changelogFile 'CHANGELOG.md' # The file with the release notes diff, defaults to ANNOUNCEMENTS.md
  $ release --draft # will create a release draft
  $ release --quiet # will silently succeed or fail
  ```
Accepts aliases, for example `-c` for `--changelogFile` and `-q` for `--quiet`.

## Troubeshooting

Make sure that when you rename your Github repository to reconfigure your `origin` push/fetch url locally.

## LICENSE

MIT
