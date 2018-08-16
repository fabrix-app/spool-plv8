import { Spool } from '@fabrix/fabrix/dist/common'
import * as PLV8 from 'plv8'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class PLV8Trailpack extends Spool {

  constructor (app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })
  }

  /**
   * Validate plv8 store setting
   */
  validate () {
    if (!this.app.config.get('plv8.store')) {
      return new Error('config.plv8.store must be set')
    }
  }

  configure () {
    this.log.debug('app.config.main.paths', this.app.config.get('main.paths'))
  }

  /**
   * Instantiate PLV8 with knex connection
   */
  initialize () {
    const plconfig = this.app.config.get('plv8')

    this.log.debug('plv8: using store', plconfig.store)

    this.plv8 = new PLV8(this.app.spools.knex.stores[plconfig.store].knex)

    return this.plv8.init()
      .then(() => {
        return Promise.all(plconfig.dependencies.map(({ modulePath, moduleName }) => {
          return this.plv8.install({ modulePath, moduleName })
        }))
      })
      .catch(err => {
        this.log.error('trailpack-plv8:', err)
        throw err
      })
  }
}

