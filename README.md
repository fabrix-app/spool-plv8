# spool-plv8

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

require() and execute nodejs code in Postgres with PLV8 and Fabrix. Depends on [spool-knex](https://github.com/fabrix-app/spool-knex).

## Install

```sh
$ npm install --save @fabrix/spool-plv8
```

## Configure

```js
// config/main.ts
import { PLV8Spool } from '@fabrix/spool-plv8'
import { KnexSpool } from '@fabrix/spool-knex'
export const main = {
  spools: [
    // ... other spools
    KnexSpool,
    PLV8Spool
  ]
}
```

```js
// config/plv8.ts
export const plv8 = {
  /**
   * The name of the database store to use; must be defined in config.stores
   */
  store: 'some-plv8-store'
}
```

## License
MIT

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-plv8.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-plv8
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-plv8/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-plv8/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-plv8.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-plv8
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-plv8.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-plv8/coverage
