var React = require('react');
var Keywordfilter = require('./Keywordfilter');
var Timefilter = require('./Timefilter');
var DropPin = require('./DropPin');
var tweetLoader = require('./TweetLoader');
var Menu = require('./Menu');
var Accordion = require('./Accordion');

var TwitterMapController = React.createClass({
  propTypes: {
    mapbox: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      tweets: [],
      keyword: null,
      mode: "all",
      time: null,
      unit: "m",
      distance: 10,
      show_pin: false,
      lat: null,
      lon: null,
      updateFrequency: null
    }
  },

  componentDidMount() {
    this.pointsLayer = null;
    this.pin = null;
  },

  componentDidUpdate() {
    this.showTweetsOnMap();
    return true;
  },

  showTweetsOnMap() {
    var mapbox = this.props.mapbox;
    var tweets = this.state.tweets;
    if (this.pointsLayer != null) {
      mapbox.removeLayer(this.pointsLayer);
    }
    var clusterLayer = new L.MarkerClusterGroup({
      iconCreateFunction: function(cluster) {
        var html = '<div class="tweet-cluster-outer">' + 
        '<div class="tweet-cluster">' + cluster.getChildCount() + '</div>' + 
        '</div>';
        return L.divIcon({
          className: 'tweet-cluster-icon',
          html: html
        });
      }
    });

    tweets.forEach(function(tweet) {
      var coords = tweet.geometry.coordinates;
      var url = "http://twitter.com/" + tweet.properties.screen_name + "/status/" + tweet.properties.tweet_id;
      var text = "<div class='author'><strong>" + tweet.properties.title + "</strong></div>" +
      "<div class='date'>" + tweet.properties.datetime + "</div>" + 
      "<div class='contents'>" + tweet.properties.description + "</div>" +
      "<a href='" + url + "' target=_blank>View Tweet</a>" +
      "</div>"
      var marker = L.marker(new L.LatLng(coords[1], coords[0]), {
        icon: L.mapbox.marker.icon({
          'marker-color': '89C9FA',
          'marker-size': 'medium'
        }),
        description: text
      });
      marker.bindPopup(text);
      clusterLayer.addLayer(marker);
    });

    this.pointsLayer = clusterLayer;
    mapbox.addLayer(this.pointsLayer);

  },

  showPin() {
    var self = this;
    var mapbox = this.props.mapbox;
    this.pin = L.marker([40.71, -74.0059], {
      icon: L.mapbox.marker.icon({
        'marker-color': '#f86767'
      }),
      draggable: true
    }).addTo(mapbox);
    this.pin.on('dragend', ondragend);
    ondragend();

    function ondragend() {
        var m = self.pin.getLatLng();
        console.log('Latitude: ' + m.lat + ', Longitude: ' + m.lng);
        self.setState({
          lat: m.lat,
          lon: m.lng
        }, function() {
          var parameters = {};
          if (self.state.keyword) {
            self.loadResults(self.state.keyword);
          }
        });
    }
  },

  removePin() {
    var mapbox = this.props.mapbox;
    mapbox.removeLayer(this.pin);
    this.loadResults(this.state.keyword);
  },

  onFilterValueChanged(value) {
    console.log('value changed: ' + value);
    var self = this;

    this.setState({keyword: value}, function() {
      //var updateFrequency = window.setInterval(function() {
      self.loadResults(self.state.keyword);
      //}, 10000);
    });

  },

  buildParameters(parameters) {
    if (this.state.mode == 'all') {

    } else {
      var time = this.state.time;
      var unit = this.state.unit;
      if (time && unit && time > 0) {
        parameters['from'] = "now-" + time + unit;
        parameters['to'] = "now";
      }
    }

    //console.log('show_pin: ' + this.state.show_pin);
    if (this.state.show_pin) {
      var distance = this.state.distance;
      var lat = this.state.lat;
      var lon = this.state.lon;
      //console.log('distance: ' + distance + ', lat: ' + lat + ', lon: ' + lon);
      if (distance && (lat && lon) && distance > 0) {
        parameters['distance'] = distance + 'km';
        parameters['lat'] = lat;
        parameters['lon'] = lon;
      }
    }
  },

  loadResults(keyword) {
    var self = this;
    var parameters = {};
    if (self.state.keyword) {
      if (this.state.updateFrequency != null) window.clearInterval(this.state.updateFrequency);
      this.buildParameters(parameters);
      this.state.updateFrequency = window.setInterval(function updateTweets() { // update every 15 seconds
        tweetLoader.loadByKeyword(keyword, parameters).done(function(data) {
          console.log(data);
          var scroll_id = data._scroll_id;
          var total = data.hits.total;
          var tweets = [];
          if (total > 0) {
            $('.menu').addClass("overlay");
            var intervalId = window.setInterval(function() { /*TODO: maybe should not use setInterval, since if the distance is huge, the search needs more time*/
              tweetLoader.scroll(scroll_id).done(function(value) {
                console.log(value);
                if (value.hits.length === 0) {
                  window.clearInterval(intervalId);
                  $('.menu').removeClass('overlay');
                  self.setState({
                    tweets: tweets
                  });
                } else {
                  tweets = tweets.concat(value.hits);
                }
              });
            }, 200);
          } else {
            self.setState({
              tweets: tweets
            });
          }
        });
        return updateTweets;
      }(), 15000);
    }
  },

  onTimeUnitValueChanged(value) {
    console.log('time unit changed:' + value);
    var self = this;
    this.setState({unit: value}, function() {
      //var updateFrequency = window.setInterval(function() {
      self.loadResults(self.state.keyword);
      //}, 10000);
    });
  },

  onTimeChanged(value) {
    console.log('time changed:' + value);
    var self = this;
    this.setState({time: value}, function() {
      //var updateFrequency = window.setInterval(function() {
      if (value > 0)
        self.loadResults(self.state.keyword);
      //}, 10000);
    });
  },

  onModeChanged(value) {
    console.log('mode changed:' + value);
    var self = this;
    this.setState({mode: value}, function() {
      //var updateFrequency = window.setInterval(function() {
      self.loadResults(self.state.keyword);
      //}, 10000);
    });
  },

  onDistanceChanged(value) {
    console.log('distance changed:' + value);
    var self = this;
    this.setState({distance: value}, function() {
      //var updateFrequency = window.setInterval(function() {
      if (value > 0 && value <= 200)
        self.loadResults(self.state.keyword);
      //}, 10000);
    });
  },

  onPinStatusChanged(value) {
    console.log('show pin? ' + value);
    this.setState({show_pin: value}, function() {
      if (value) {
        this.showPin();
      } else {
        this.removePin();
      }
    });
  },

  render() {
    return (
      <div>
        <Menu ref="right" alignment="right" header={"TwittMap"} footer={"Developed by Yue Cen & Houliang Lu"}>
          <div className="keyword-container">
            <Keywordfilter onChange = {this.onFilterValueChanged}/>
          </div>
          <div className="time-container">
            <Accordion title={"Time range filter"}>
              <Timefilter onUnitChange = {this.onTimeUnitValueChanged} onModeChange = {this.onModeChanged} onTimeChange = {this.onTimeChanged} />
            </Accordion>
          </div>
          <div className="drop-pin-container">
            <Accordion title={"Distance range filter"}>
              <DropPin onPinStatusChange = {this.onPinStatusChanged} onDistanceChange = {this.onDistanceChanged} />
            </Accordion>
          </div>
        </Menu>
      </div>
    )
  }
});

module.exports = TwitterMapController;