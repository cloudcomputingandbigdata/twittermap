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
        "photo", "basketball", "nba", "gym"
      ]
    };
  },

  handleChange(val) {
    this.setState({
      selectedKeyword: val.value
    });
    this.props.onChange(val);
  },

  render() {
    var options = this.props.keywords.map(function(key) {
      return {
        value: key,
        label: key.toUpperCase()
      }
    });
    var selectedKeyword = this.state.selectedKeyword;
    return <Select name = "form-field-name"
    options = {options} value = {selectedKeyword} onChange = {this.handleChange} />
  }
});

module.exports = Keywordfilter;