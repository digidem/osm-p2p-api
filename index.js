var getMap = require('./api/get_map')

module.exports = function (osm) {
  return {
    getMap: getMap(osm)
  }
}
