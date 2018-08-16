import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
/**
 * @module Plv8Service
 * @description Interact with PLV8 modules from Trails
 */
export class Plv8Service extends Service {
  /**
   * Returns promise of the evaluation
   */
  eval (fn) {
    const plv8 = this.app.spools.plv8.plv8

    return plv8.eval(fn)
  }
}

