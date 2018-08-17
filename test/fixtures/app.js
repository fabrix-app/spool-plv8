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
          host: 'localhost',
          database: process.env.POSTGRES_DB || 'Knex',
          user: process.env.POSTGRES_USER || null,
          password: process.env.POSTGRES_PASSWORD
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


