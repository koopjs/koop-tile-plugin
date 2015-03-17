var mkdirp = require('mkdirp'),
  path = require('path'),
  tiles = require('mapnik-tiles'),
  fs = require('fs');


// tells koop that this is plugin
exports.type = 'plugin';

// name is used by koop to give models/controller access to plugin
exports.name = 'tiles';


var getTile = function(params, data, callback ){
  var x = parseInt( params.x ),
    y = parseInt( params.y ),
    z = parseInt( params.z ),
    key = params.key,
    format = params.format;

  var options = {
    name: params.name,
    dir: params.dir
  };

  if (!params.x || !params.y || !params.z || !format || !key){
    callback('Missing parameters', null);
  } 
  else {
    // check the cache - the local file system 
    checkFS( x, y, z, key, format, data, options, function( err, file ){
      if ( file ){
        callback( err, file );
      } 
      else {
        callback( err, null );
      }
    });
  }

};

var checkFS = function( x, y, z, key, format, geojson, options, callback ){
    var p = [ options.dir + 'tiles', key, format, z, x].join('/');
    var file = p + '/' + y + '.' + format;

    options.size = options.size || 256;

    mkdirp( p, function(){
      if ( !fs.existsSync( file ) ) {

        var params = {
          format: format,
          name: options.name,
          z: z,
          x: x,
          y: y
        };

        stashTile( file, geojson, params, function( err, newfile ){
          callback( err, newfile );
        });

      } else {
        // file already exists 
        callback( null, file );
      }
    });
  };


// calls mapnik-tiles to create a new tile 
// for json it just writes to disk and returns
// for png, pbf, or utf, it calls mapnik-tiles
var stashTile = function( file, geojson, params, callback ){

  // for geojson tile just create it and return it
  if ( params.format == 'json' ){

    delete geojson.info;
    delete geojson.name;
    geojson.type = 'FeatureCollection';
    fs.writeFile( file, JSON.stringify( geojson ), function(){
      callback( null, file );
    });

  // for any other format call mapnik-tiles
  } else {

    tiles.generate( geojson, params, function( err, tileBuffer ){
      if ( err ) {
        callback( err, null );
      } else {
        fs.writeFile( file, tileBuffer, function( err ) {
          callback( null, file );
        });
      }
    });
            
  }
};

// expose the methods in the plugin 
exports.stashTile = stashTile;
exports.checkFS = checkFS;
exports.getTile = getTile;
