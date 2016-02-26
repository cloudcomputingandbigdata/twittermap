$('#select').dropdown({
  useLabels: true,
  maxSelections: 10,
  apiSettings: {
    url: '/twittermap/keywords'
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

L.mapbox.map('map', 'houlianglv.p8o27ai7')
  .setView([37.8, -96], 4)
  .featureLayer.setGeoJSON(geojson);