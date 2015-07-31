# koop-tile-plugin

> Koop plugin that enables tile generation via mapnik.

[![npm][npm-img]][npm-url]
[![travis][travis-img]][travis-url]

[npm-img]: https://img.shields.io/npm/v/koop-tile-plugin.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/koop-tile-plugin
[travis-img]: https://img.shields.io/travis/koopjs/koop-tile-plugin.svg?style=flat-square
[travis-url]: https://travis-ci.org/koopjs/koop-tile-plugin

Adds tiles creation (png, pbf, utf) to [Koop](https://github.com/koopjs/koop) via [mapnik](https://www.npmjs.com/package/mapnik) using [mapnik-tiles](https://www.npmjs.com/package/mapnik-tiles).

## Install

```
npm install koop-tile-plugin --save
```

## Usage

```js
var koop = require('koop')
var tiles = require('koop-tile-plugin')

koop.register(tiles)
```

## Resources

* [Koop Documentation](https://koopjs.github.io)
* [ArcGIS for Developers](http://developers.arcgis.com)
* [ArcGIS REST API Documentation](http://resources.arcgis.com/en/help/arcgis-rest-api/)
* [twitter.com/esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## License

[Apache 2.0](LICENSE)
