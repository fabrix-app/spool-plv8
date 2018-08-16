'use strict'

const assert = require('assert')
const PLV8 = require('plv8')

describe('Spool', () => {
  let spool
  before(() => {
    spool = global.app.spools.plv8
  })
  it.skip('TODO should be loaded into the app.spools collection', () => {
    assert(spool)
  })
  describe('#validate', () => {
    it.skip('TODO test')
  })
  describe('#configure', () => {
    it.skip('TODO test')
  })
  describe('#initialize', () => {
    it('should instantiate PLV8', () => {
      assert(spool.plv8 instanceof PLV8)
    })
    it('should install config.plv8.dependencies', () => {
      return spool.plv8.eval(() => {
        const _ = require('lodash')
        return _.map([ 1, 2, 3 ], e => e + 1)
      })
      .then(result => {
        assert.equal(result[0], 2)
      })
    })
  })
})
