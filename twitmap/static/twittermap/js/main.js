var React = require('react');
var ReactDOM = require('react-dom');
var TwitterMapController = require('./TwitterMapController');


L.mapbox.accessToken = 'pk.eyJ1IjoiaG91bGlhbmdsdiIsImEiOiJjaWwzMjNtcjEzbGdvdWdtM2c4bjNyeG1lIn0.fZxFewEvPi90HGANZnrkyA';
var mapbox = L.mapbox.map('map', 'houlianglv.p8o27ai7');
mapbox.setView([40.71, -74.0059], 4);

ReactDOM.render(<TwitterMapController mapbox={mapbox} />, 
  document.getElementById('twittermap-controller'));