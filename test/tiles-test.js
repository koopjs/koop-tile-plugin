var test = require('tape')
var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')
var tiles = require(__dirname + '/../')
var fixtures = {
  geojson: path.join(__dirname, 'fixtures', '11.geojson'),
  pbf: path.join(__dirname, 'fixtures', 'co.6.13.24.vector.pbf'),
  png: path.join(__dirname, 'fixtures', '5.5.12.png'),
  utf: path.join(__dirname, 'fixtures', '5.5.12.utf')
}
var geojsonData = JSON.parse(fs.readFileSync(fixtures.geojson, { encoding: 'utf8' }))
var opts = { name: 'test-layer' }

test('method: getTile: bad params', function (t) {
  var badParams = {
    x: 1,
    y: 1,
    format: 'png',
    key: 'fake-key'
  }

  tiles.getTile(badParams, opts, function (err, res) {
    t.ok(err, 'returns an error')
    t.notOk(res, 'does not return a response')
    t.end()
  })
})

test('method: getTile: utf', function (t) {
  var params = {
    x: 5,
    y: 12,
    z: 5,
    dir: __dirname,
    format: 'utf',
    key: 'fake-key'
  }

  tiles.getTile(params, opts, function (err, res) {
    t.error(err, 'does not error')
    t.ok(res, 'returns a response')

    var parsedFile = JSON.parse(fs.readFileSync(res).toString())

    t.equal(typeof parsedFile, 'object', 'utf file contains a valid JSON object')
    t.ok(parsedFile.grid, 'object contains grid property')
    t.ok(Array.isArray(parsedFile.grid), 'grid is an array')

    rimraf(path.join(__dirname, 'tiles'), function (err) {
      t.error(err, 'cleaned up test directory')
      t.end()
    })
  })
})

test('method: stashTile: vector (pbf)', function (t) {
  var params = {
    format: 'vector.pbf',
    name: '61324',
    z: 6,
    x: 13,
    y: 24
  }

  tiles.stashTile(fixtures.pbf, geojsonData, params, function (err, res) {
    t.error(err, 'does not error')
    t.ok(res, 'returns a response')
    t.end()
  })
})

test('method: stashTile: png', function (t) {
  var params = {
    format: 'png',
    name: '61324',
    z: 5,
    x: 5,
    y: 12
  }

  tiles.stashTile(fixtures.png, geojsonData, params, function (err, res) {
    t.error(err, 'does not error')
    t.ok(res, 'returns a response')
    t.end()
  })
})

test('method: stashTile: utf', function (t) {
  var params = {
    format: 'utf',
    name: '61324',
    z: 5,
    x: 5,
    y: 12
  }

  tiles.stashTile(fixtures.utf, geojsonData, params, function (err, res) {
    t.error(err, 'does not error')
    t.ok(res, 'returns a response')
    t.end()
  })
})
