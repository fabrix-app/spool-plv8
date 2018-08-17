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
    main: {
      spools: [
        require('@fabrix/spool-knex').KnexSpool,
        require('../../dist').PLV8Spool
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
          database: process.env.PG_DB || 'Knex',
          user: process.env.PG_USER || null,
          password: process.env.PG_PASSWORD
        },
        migrate: 'drop'
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


