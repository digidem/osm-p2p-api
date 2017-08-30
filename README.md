# osm-p2p-api

> Functions for implementing the OSM API using osm-p2p-db.

This module sits between [`osm-p2p-db`](https://github.com/digidem/osm-p2p-db)
and [`osm-p2p-server`](https://github.com/digidem/osm-p2p-server). It provides
the logic that turns the data from an `osm-p2p-db` into what the
`osm-p2p-server` needs in order to satisfy the [OSM
API](https://wiki.openstreetmap.org/wiki/API_v0.6).

We (Digital Democracy) are also using it for things like GeoJSON exports in
[Mapeo](https://github.com/digidem/mapeo-desktop).

## Status

**Work in Progress**. API functions from `osm-p2p-server` will be moved over
here incrementally as they are needed. Semver will be respected throughout the
move.

## Usage

```js
var osmApi = require('osm-p2p-api')
var osmP2p = require('osm-p2p-mem')

var osm = osmP2p()
var api = osmApi(osm)

var node = {
  type: 'node',
  lat: 14,
  lon: -1
}

osm.create(node, function () {
  var bbox = [-180, -85, 180, 85]
  var stream = api.getMap(bbox, function (err, res) {
    console.log(res)
  })
})
```

outputs

```
[ { type: 'node',
    lat: 14,
    lon: -1,
    id: '14932367278207151409',
    version: '6b8042a175ba486961d3d11277c6a6e9c0f882da3036dcd1e68e96e3acc45a95' } ]
```

## API

```js
var osmApi = require('osm-p2p-api')
```

### var api = osmApi(osm)

Constructs a new API object over the `osm-p2p-db` instance `osm`.

### var stream = api.getMap(bbox[, opts][, cb])

Get all OSM documents in the bounding box `bbox`, which is of the form

```js
var bbox = [minLon, minLat, maxLon, maxLat]
```

`opts`, if provided, accepts the following properties:

- `opts.forks` (Boolean): whether to include forks of documents. Defaults to
  `false`.

The callback `cb` is also optional. If provided, results will be buffered and
returned via `cb`. If no callback is given, the function returns a Readable
stream `stream`.


## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install osm-p2p-api
```

## Acknowledgments

This module was born from a great idea by @gmaclennan!

## License

ISC

