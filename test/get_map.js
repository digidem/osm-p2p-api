var test = require('tape')
var through = require('through2')
var Duplex = require('readable-stream/duplex')
var osmApi = require('..')

var bounds = {
  minLat: 1,
  maxLat: 2,
  minLon: 11,
  maxLon: 12
}

test('getMap', t => {
  t.plan(4)
  var expectedQuery = [[bounds.minLat, bounds.maxLat], [bounds.minLon, bounds.maxLon]]
  var mockedOsm = {
    queryStream: function (query, opts) {
      t.deepEqual(query, expectedQuery, 'calls osm.queryStream with correct query')
      t.deepEqual(opts, {order: 'type', forks: false}, 'calls osm.queryStream with opts order: type')
      return through()
    }
  }
  var api = osmApi(mockedOsm)
  var bbox = [bounds.minLon, bounds.minLat, bounds.maxLon, bounds.maxLat]
  t.equal(typeof api.getMap, 'function')
  var s = api.getMap(bbox, {order: 'type'})
  t.true(s instanceof Duplex, 'instance of Duplex stream')
})
