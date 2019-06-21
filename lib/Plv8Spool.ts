import { Spool } from '@fabrix/fabrix/dist/common'
import PLV8 from 'plv8'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class PLV8Spool extends Spool {
  public plv8

  constructor (app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      plv8 : {
        get: () => {
          return this.plv8
        },
        set: (plv8) => {
          throw new Error('plv8 can not be set through FabrixApp, check spool-plv8 instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  /**
   * Validate plv8 store setting
   */
  async validate () {

    const requiredSpools = ['knex']
    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-plv8 requires spools: ${ requiredSpools.join(', ') }!`))
    }

    if (!this.app.config.get('plv8.store')) {
      return new Error('config.plv8.store must be set')
    }
  }

  configure () {
    this.log.debug('spool: app.config.main.paths', this.app.config.get('main.paths'))
  }

  /**
   * Instantiate PLV8 with knex connection
   */
  async initialize () {
    const plconfig = this.app.config.get('plv8')

    this.log.debug('spool: plv8 using store', plconfig.store)

    this.plv8 = new PLV8(this.app.spools.knex.stores.get(plconfig.store).knex)

    return this.plv8.init()
      .then(() => {
        return Promise.all(plconfig.dependencies.map(({ modulePath, moduleName }) => {
          return this.plv8.install({ modulePath, moduleName })
        }))
      })
      .catch(err => {
        this.log.error('spool-plv8:', err)
        throw err
      })
  }
}

