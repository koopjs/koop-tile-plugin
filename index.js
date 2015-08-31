var mkdirp = require('mkdirp')
var tiles = require('mapnik-tiles')
var path = require('path')
var fs = require('fs')
var pkg = require('./package')

var plugin = {
  name: 'tiles',
  type: 'plugin',
  version: pkg.version
}

/**
 * retrieves a tile
 *
 * @param {object} params
 * @param {[type]} geojson
 * @param {Function} callback
 */
function getTile (params, geojson, callback) {
  var x = parseInt(params.x, 10)
  var y = parseInt(params.y, 10)
  var z = parseInt(params.z, 10)
  var key = params.key
  var format = params.format

  var options = {
    name: params.name,
    dir: params.dir
  }

  if (!params.x || !params.y || !params.z || !format || !key) {
    callback('Missing parameters', null)
  } else {
    // check the cache - the local file system
    checkFS(x, y, z, key, format, geojson, options, function (err, file) {
      if (file) {
        callback(err, file)
      } else {
        callback(err, null)
      }
    })
  }
}

/**
 * checks if a tile already exists in the file system
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {string} key
 * @param {string} format
 * @param {object} geojson
 * @param {object} options
 * @param {function} callback
 */
function checkFS (x, y, z, key, format, geojson, options, callback) {
  var p = path.join(options.dir, 'tiles', key, format, '' + z, '' + x)
  var file = path.join(p, y + '.' + format)

  options.size = options.size || 256

  mkdirp(p, function () {
    if (!fs.existsSync(file)) {
      var params = {
        format: format,
        name: options.name,
        z: z,
        x: x,
        y: y
      }

      stashTile(file, geojson, params, function (err, newfile) {
        callback(err, newfile)
      })

    } else {
      // file already exists
      callback(null, file)
    }
  })
}

/**
 * create a new tile using mapnik-tiles
 * for json it just writes to disk and returns
 * for png, pbf, or utf, it calls mapnik-tiles
 *
 * @param {string} file
 * @param {object} geojson
 * @param {object} params
 * @param {function} callback
 */
function stashTile (file, geojson, params, callback) {
  // for geojson tile just create it and return it
  if (params.format === 'json') {
    delete geojson.info
    delete geojson.name
    geojson.type = 'FeatureCollection'
    fs.writeFile(file, JSON.stringify(geojson), function () {
      callback(null, file)
    })

  // for any other format call mapnik-tiles
  } else {
    tiles.generate(geojson, params, function (err, tileBuffer) {
      if (err) return callback(err, null)

      fs.writeFile(file, tileBuffer, function (err) {
        if (err) return callback(err)
        callback(null, file)
      })
    })
  }
}

plugin.stashTile = stashTile
plugin.checkFS = checkFS
plugin.getTile = getTile

module.exports = plugin
