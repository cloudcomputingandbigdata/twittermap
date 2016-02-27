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
      }, 200);
    });
  }
});


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