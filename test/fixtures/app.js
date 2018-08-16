'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
    models: { },
    controllers: { },
    services: { }
  },
  config: {
    log: {
      logger: new smokesignals.Logger('silly')
    },
    main: {
      spool: [
        require('@fabrix/spool-knex').KnexSpool,
        require('../../dist').Plv8Spool
      ]
    },
    models: {
      migrate: 'none'
    },
    stores: {
      plv8: {
        orm: 'knex',
        client: 'pg',
        connection: {
          host: process.env.PG_HOST || 'localhost',
          database: process.env.PG_DB || 'postgres',
          user: process.env.PG_USER || 'postgres',
          password: process.env.PG_PASSWORD
        }
      }
    },
    plv8: {
      store: 'plv8',
      dependencies: [
        {
          modulePath: require.resolve('lodash'),
          moduleName: 'lodash'
        }
      ]
    }
  }
}, smokesignals.FailsafeConfig)


