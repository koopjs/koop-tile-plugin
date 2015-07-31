/* global describe, it */

var should = require('should')
var fs = require('fs')

var data = JSON.parse(fs.readFileSync(__dirname + '/fixtures/11.geojson', { encoding: 'utf8' }))
var opts = {
  name: 'test-layer'
}
var tiles = require(__dirname + '/../')

describe('Tiles caching logic', function () {
  describe('errors when params are wrong', function () {
    it('when missing a z', function (done) {
      tiles.getTile({x: 1, y: 1, format: 'png', key: 'fake-key'}, opts, function (err, res) {
        should.exist(err)
        should.not.exist(res)
        done()
      })
    })
  })

  describe('when creating utf tiles', function () {
    it('should create a legit UTF Grid tile', function (done) {
      var params = {
        x: 5,
        y: 12,
        z: 5,
        dir: __dirname,
        format: 'utf',
        key: 'fake-key'
      }
      tiles.getTile(params, opts, function (err, res) {
        should.not.exist(err)
        should.exist(res)
        var type = typeof JSON.parse(fs.readFileSync(res).toString())
        type.should.equal('object')
        fs.unlink(res)
        done()
      })
    })
  })

  describe('vector-tiles', function () {
    it('when creating a tile', function (done) {
      var file = __dirname + '/fixtures/co.6.13.24.vector.pbf'

      var params = {
        format: 'vector.pbf',
        name: '61324',
        z: 6,
        x: 13,
        y: 24
      }

      tiles.stashTile(file, data, params, function (err, res) {
        should.not.exist(err)
        should.exist(res)
        done()
      })
    })

  })

  describe('png-tiles', function () {
    it('when creating a tile', function (done) {
      var file = __dirname + '/fixtures/5.5.12.png'

      var params = {
        format: 'png',
        name: '61324',
        z: 5,
        x: 5,
        y: 12
      }

      tiles.stashTile(file, data, params, function (err, res) {
        should.not.exist(err)
        should.exist(res)
        done()
      })
    })
  })

  describe('utf-tiles', function () {
    it('when creating a tile', function (done) {
      var file = __dirname + '/fixtures/5.5.12.utf'

      var params = {
        format: 'utf',
        name: '61324',
        z: 5,
        x: 5,
        y: 12
      }

      tiles.stashTile(file, data, params, function (err, res) {
        should.not.exist(err)
        should.exist(res)
        done()
      })
    })
  })

})
