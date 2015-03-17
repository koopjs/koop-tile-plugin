var should = require('should');
var fs = require('fs');

var data = JSON.parse(fs.readFileSync(__dirname + '/fixtures/11.geojson').toString());
var opts = {
  name: 'test-layer'
};
var tiles = require(__dirname + '/../');


describe('Tiles caching logic', function(){


    describe('errors when params are wrong', function(){
      it('when missing a z', function(done){
        tiles.getTile( {x: 1, y: 1, format: 'png', key: 'fake-key'}, opts, function( err, res ){
          should.exist(err);
          should.not.exist(res);
          done();
        });
      });
    });

    describe('vector-tiles', function(){
      it('when creating a tile', function(done){
        var file = __dirname + '/fixtures/co.6.13.24.vector.pbf';

        var params = {
          format: 'vector.pbf',
          name: '61324',
          z: 6,
          x: 13,
          y: 24
        };

        tiles.stashTile( file, data, params, function( err, res ){
          should.not.exist(err);
          should.exist(res);
          done();
        });
      });

    });

    describe('png-tiles', function(){
      it('when creating a tile', function(done){

        var file = __dirname + '/fixtures/5.5.12.png';

        var params = {
          format: 'png',
          name: '61324',
          z: 5,
          x: 5,
          y: 12
        };

        tiles.stashTile( file, data, params, function( err, res ){
          should.not.exist(err);
          should.exist(res);
          done();
        });
      });
    });

    describe('utf-tiles', function(){
      it('when creating a tile', function(done){

        var file = __dirname + '/fixtures/5.5.12.utf';

        var params = {
          format: 'utf',
          name: '61324',
          z: 5,
          x: 5,
          y: 12
        };

        tiles.stashTile( file, data, params, function( err, res ){
          should.not.exist(err);
          should.exist(res);
          done();
        });
      });
    });

});

