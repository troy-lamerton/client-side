var xhr = require('xhr')
var greeting = require('./views/greeting.hbs')
var satLocation = require('./views/satLocation.hbs')

var endpoint = 'https://api.wheretheiss.at/v1/satellites'

xhr.get(endpoint, function (err, data) {
  if (err) {
    console.error(err)
  }
  // In case you're curious
  console.log(data.body) // FYI: data.body is a string

  // Replace 'Space' below with the response
  var target = document.getElementsByTagName('main')[0]
  target.innerHTML = greeting({name: JSON.parse(data.body)[0].name})
})

var button = document.getElementById('getButton')
button.addEventListener('click', updateSatLocation)

function updateSatLocation () {
  var doc = document.getElementsByTagName('main')[0]

  xhr.get(endpoint + '/25544', function (err, data) {
    var altitude = data.body.altitude
    // convert num to pixel string
    altitude = altitude.toString() + 'px'
    doc.innerHTML = satLocation({name: data.body.name, altitude: altitude, timestamp: 1436029902})

    if (err) {
      console.log('xhr error')
      console.error(err)
    }
    console.log(data.body)
  })

}
