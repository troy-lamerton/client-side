var xhr = require('xhr')
var greeting = require('./views/greeting.hbs')

var satLocation = require('./views/satLocation.hbs')

var endpoint = 'https://api.wheretheiss.at/v1/satellites'
var updateSatLocation = require('./updateSatLocation')

xhr.get(endpoint, function (err, data) {
  if (err) {
    console.error(err)
  }

  // Replace 'Space' below with the response
  var target = document.getElementsByTagName('main')[0]
  target.innerHTML = greeting({name: JSON.parse(data.body)[0].name})
})

var doc = document.getElementsByTagName('main')[0]

var button = document.getElementById('getButton')
button.addEventListener('click', updateDOM)

function updateDOM () {
  doc.innerHTML = satLocation(updateSatLocation(endpoint + '/25544'))
}

var pingSatLocation;
window.onload = function () {
  pingSatLocation = window.setInterval(updateDOM, 1200)
}
