var React = require('react');
var Keywordfilter = require('./Keywordfilter');
var tweetLoader = require('./TweetLoader');

var TwitterMapController = React.createClass({
  propTypes: {
    mapbox: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      tweets: [],
      keyword: null
    }
  },

  componentDidMount() {
    this.pointsLayer = null;

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
      var url = "";
      //var url = "http://twitter.com/" + tweet.properties.screen_name + "/status/" + tweet.properties.tweet_id;
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

  onFilterValueChanged(option) {
    console.log('value changed: ' + option.value);
    //set the keyword
    //this.setState({keyword: value});
    var that = this,
    value = option.value;
    tweetLoader.loadByKeyword(value).done(function(data) {
      console.log(data);
      var scroll_id = data._scroll_id;
      var tweets = [];
      var intervalId = window.setInterval(function() {
        tweetLoader.scroll(scroll_id).done(function(value) {
          console.log(value);
          if (value.hits.length === 0) {
            window.clearInterval(intervalId);
            that.setState({
              tweets: tweets
            });
          } else {
            tweets = tweets.concat(value.hits);
          }
        });
      }, 200);
    });
  },

  render() {
    return ( 
      <Keywordfilter onChange = {this.onFilterValueChanged}/>
    )
  }
});

module.exports = TwitterMapController;