var xhr = require('xhr')

module.exports = function (endpoint) {
  xhr.get(endpoint, function (err, data) {
    var body = JSON.parse(data.body)
    if (err) {
      console.error(err)
    }
    var altitude = body.altitude

    // altitude is usually 405 +- 3.00
    const constant = 400
    altitude -= constant
    altitude *= 100
    altitude = Math.floor(altitude)

    // convert num to pixel string
    altitude = altitude.toString() + 'px'
    console.log('new top value:', altitude)
    return {name: body.name, altitude: altitude, timestamp: body.timestamp}
  })
}
