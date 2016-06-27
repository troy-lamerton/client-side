var xhr = require('xhr')
var greeting = require('./views/greeting.hbs')

var satLocation = require('./views/satLocation.hbs')

var endpoint = 'https://api.wheretheiss.at/v1/satellites'

xhr.get(endpoint, function (err, data) {
  if (err) {
    console.error(err)
  }

  // Replace 'Space' below with the response
  var target = document.getElementsByTagName('main')[0]
  target.innerHTML = greeting({name: JSON.parse(data.body)[0].name})
})

var button = document.getElementById('getButton')
button.addEventListener('click', updateSatLocation)

function updateSatLocation () {
  var doc = document.getElementsByTagName('main')[0]

  xhr.get(endpoint + '/25544', function (err, data) {
    var body = JSON.parse(data.body)
    if (err) {
      console.error(err)
    }
    var altitude = body.altitude
    altitude = altitude.floor()

    // convert num to pixel string
    altitude = altitude.toString() + 'px'
    console.log('new top value:', altitude)
    doc.innerHTML = satLocation({name: body.name, altitude: altitude, timestamp: body.timestamp})

    if (err) {
      console.log('xhr error')
      console.error(err)
    }
    console.log(data.body)
  })

}
