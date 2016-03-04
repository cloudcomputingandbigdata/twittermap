var React = require('react');
var Select = require('react-select');
var ToggleDisplay = require('react-toggle-display');

var Timefilter = React.createClass({
  propTypes: {
    onUnitChange: React.PropTypes.func.isRequired,
    onTimeChange: React.PropTypes.func.isRequired,
    onModeChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      selectedUnit: "m",
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

  componentDidMount() {
    this.pointsLayer = null;
    this.pin = null;
    /*$('.ui.dropdown')
      .dropdown();*/
  },

  handleChange(e) {
    var self = this;
    this.setState({
      selectedUnit: e.target.value
    }, function() {
      self.props.onUnitChange(self.state.selectedUnit);
    });
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
      <div className="time-filter settings">
        <div>
          <label>
            <input type="radio" name="from_time" value="all" checked={this.state.selectedMode === "all"} onChange={this.handleMode} />
            <span>Load all tweets</span>
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="from_time" value="not_all" checked={this.state.selectedMode === "not_all"} onChange={this.handleMode} />
            <span>Load tweets within the last</span>
          </label>

          <div className="ui small action input">
            <input type="number" defaultValue={this.state.inputTime} onChange={this.handleTime} disabled={this.state.selectedMode != "not_all"} />
            <select className="ui compact selection dropdown" value={this.state.selectedUnit} onChange={this.handleChange} disabled={this.state.selectedMode != "not_all"}>
              <option value="m">minutes</option>
              <option value="h">hours</option>
              <option value="d">days</option>
              <option value="w">weeks</option>
              <option value="M">months</option>
            </select>
          </div>
          <ToggleDisplay show={this.state.inputTime <= 0 && this.state.selectedMode != 'all'}>
				<div className="warning">*The value must be above zero.</div>
          </ToggleDisplay>
        </div>
      </div>
    )
  }
});

module.exports = Timefilter;