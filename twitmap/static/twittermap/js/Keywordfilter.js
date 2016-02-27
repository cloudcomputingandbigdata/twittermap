var React = require('react');
var Keywordfilter = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  componentDidMount: function(){
    $('#select').dropdown({
      useLabels: true,
      apiSettings: {
        url: '/twittermap/keywords'
      },
      onChange: this.props.onChange
    });
  },

  componentDidUpdate: function() {
      $('.ui.dropdown').dropdown('refresh');
  },

  render: function() {
    return (
      <select name="keywords" className="ui search dropdown" id="select">
        <option value="">Please select a keyword</option>
      </select>
    );
  }
});

module.exports = Keywordfilter;