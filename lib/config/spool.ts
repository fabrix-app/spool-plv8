/**
 * Spool Configuration
 *
 * @see {@link https://fabrix.app/docs/spool/config}
 */
export const spool = {
  type: 'misc',

  /**
   * Configure the lifecycle of this spool; that is, how it boots up, and which
   * order it loads relative to other spools.
   */
  lifecycle: {
    initialize: {
      listen: [ 'spool:knex:initialized' ],
      emit: []
    }
  }
}

