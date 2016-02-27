var React = require('react');
var ReactDOM = require('react-dom');
var TwitterMapController = require('./TwitterMapController');
var config = require('./config');

L.mapbox.accessToken = config.map.accesstoken;
var mapbox = L.mapbox.map('map', config.map.mapId);
mapbox.setView([40.71, -74.0059], 4);

ReactDOM.render(<TwitterMapController mapbox={mapbox} />, 
  document.getElementById('twittermap-controller'));