var React = require('react');
var Keywordfilter = require('./Keywordfilter');
var tweetLoader = require('./TweetLoader');

var TwitterMapController = React.createClass({
    propTypes: {
        mapbox: React.PropTypes.object.isRequired,
        geoJsonLayer: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            tweets: [],
            keyword: null
        }
    },

    onFilterValueChanged(text, value){
        console.log('value changed: ' + value);
        var that = this;
        tweetLoader.loadByKeyword(value).done(function(data) {
          console.log(data);
          that.props.geoJsonLayer.clearLayers();
          var scroll_id = data._scroll_id;
          var intervalId = window.setInterval(function() {
            tweetLoader.scroll(scroll_id).done(function(value) {
              console.log(value);
              if (value.hits.length === 0) {
                window.clearInterval(intervalId);
              } else {
                that.props.geoJsonLayer.addData(value.hits);
              }
            });
          }, 200);
        });
    },

    render() {
        return (
            <Keywordfilter onChange={this.onFilterValueChanged} />
        )
    }
});

module.exports = TwitterMapController;