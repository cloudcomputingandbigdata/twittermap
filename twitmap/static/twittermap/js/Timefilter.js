var React = require('react');
var Select = require('react-select');

var Timefilter = React.createClass({
  propTypes: {
    onUnitChange: React.PropTypes.func.isRequired,
    onTimeChange: React.PropTypes.func.isRequired,
    onModeChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      selectedUnit: null,
      selectedMode: "all",
      inputTime: "0"
    }
  },

  getDefaultProps() {
    return {
      units: {"minutes" : "m",
        "hours" : 'h',
        "days" : 'd',
        "weeks" : "w",
        "months" : "M"
      }
    };
  },

  handleChange(val) {
    this.setState({
      selectedUnit: val.value
    });
    this.props.onUnitChange(val);
  },

  handleMode(e) {
    this.setState({
      selectedMode: e.currentTarget.value
    });
    this.props.onModeChange(e.currentTarget.value);
  },

  handleTime(e) {
    this.setState({
      inputTime: e.currentTarget.value
    });
    this.props.onTimeChange(e.currentTarget.value);
  },

  render() {
    var options = [];
    $.each(this.props.units, function(key, val) {
      var pair = {
        value: val,
        label: key
      };
      options.push(pair);
    });
    var selectedUnit = this.state.selectedUnit;
    return (
      <div className="time-filter">
        <div><input type="radio" name="from_time" value="all" checked={this.state.selectedMode === "all"} onChange={this.handleMode} /><span>Load all tweets</span></div>
        <div>
          <input type="radio" name="from_time" value="not_all" checked={this.state.selectedMode === "not_all"} onChange={this.handleMode} />
          <span>Load tweets within the last</span>
          <input type="number" defaultValue={this.state.inputTime} onChange={this.handleTime} disabled={this.state.selectedMode != "not_all"} />
          <Select name = "time-units"
            options = {options} value = {selectedUnit} onChange = {this.handleChange} disabled={this.state.selectedMode != "not_all"} />
        </div>
      </div>
    )
  }
});

module.exports = Timefilter;