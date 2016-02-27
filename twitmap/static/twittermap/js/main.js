var React = require('react');
var ReactDOM = require('react-dom');
var TwitterMapController = require('./TwitterMapController');


L.mapbox.accessToken = 'pk.eyJ1IjoiaG91bGlhbmdsdiIsImEiOiJjaWwzMjNtcjEzbGdvdWdtM2c4bjNyeG1lIn0.fZxFewEvPi90HGANZnrkyA';
var mapbox = L.mapbox.map('map', 'houlianglv.p8o27ai7');
mapbox.setView([40.71, -74.0059], 4);
var geoJsonLayer = L.geoJson([], {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(
      "<div class='tweet-popup'>" +
      "<div class='author'>" + feature.properties.title + "</div>" +
      "<div class='date'>" + feature.properties.datetime + "</div>" +
      "<div class='contents'>" + feature.properties.description + "</div>" +
      "</div>"
    );
  }
}).addTo(mapbox);

ReactDOM.render(<TwitterMapController mapbox={mapbox} geoJsonLayer={geoJsonLayer} />, 
  document.getElementById('twittermap-controller'));