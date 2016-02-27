var tweetLoader = require('./tweetLoader');


$('#select').dropdown({
  useLabels: true,
  apiSettings: {
    url: '/twittermap/keywords'
  },
  onChange: function(text, value) {
    tweetLoader.loadByKeyword(value).done(function(data) {
      console.log(data);
      // re-initiate the geoJsonLayer
      geoJsonLayer.clearLayers();
      var scroll_id = data._scroll_id;
      var intervalId = window.setInterval(function() {
        tweetLoader.scroll(scroll_id).done(function(value) {
          console.log(value);
          if (value.hits.length === 0) {
            window.clearInterval(intervalId);
          } else {
            geoJsonLayer.addData(value.hits);
          }
        });
      }, 2000);
    });
  }
});


L.mapbox.accessToken = 'pk.eyJ1IjoiaG91bGlhbmdsdiIsImEiOiJjaWwzMjNtcjEzbGdvdWdtM2c4bjNyeG1lIn0.fZxFewEvPi90HGANZnrkyA';
var geojson = [{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-77.03238901390978, 38.913188059745586]
  },
  "properties": {
    "title": "Mapbox DC",
    "description": "1714 14th St NW, Washington DC",
    "marker-color": "#fc4353",
    "marker-size": "large",
    "marker-symbol": "monument"
  }
}, {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-122.414, 37.776]
  },
  "properties": {
    "title": "Mapbox SF",
    "description": "155 9th St, San Francisco",
    "marker-color": "#fc4353",
    "marker-size": "large",
    "marker-symbol": "harbor"
  }
}];

var mapbox = L.mapbox.map('map', 'houlianglv.p8o27ai7');
mapbox.setView([37.8, -96], 4);
var geoJsonLayer = L.geoJson([], {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<div class='tweet-popup'>" + feature.properties.description + "</div>");
  }
}).addTo(mapbox);