var React = require('react');
var Select = require('react-select');

var Keywordfilter = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      selectedKeyword: null
    }
  },

  getDefaultProps() {
    return {
      keywords: ["football", "messi", "beach", "food", "travel",
        "photo", "basketball", "nba", "gym", "soccer"
      ]
    };
  },

  handleChange(val) {
    var self = this;
    this.setState({
      selectedKeyword: val != null ? val.value : null
    }, function() {
      self.props.onChange(self.state.selectedKeyword);
    });
  },

  render() {
    var options = this.props.keywords.map(function(key) {
      return {
        value: key,
        label: key.toUpperCase()
      }
    });
    var selectedKeyword = this.state.selectedKeyword;
    return <Select name = "form-field-name" className="keyword-selector"
    options = {options} value = {selectedKeyword} onChange = {this.handleChange} placeholder={"Please select a keyword..."} />
  }
});

module.exports = Keywordfilter;