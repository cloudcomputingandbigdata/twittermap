var React = require('react');

var DropPin = React.createClass({
  propTypes: {
    onPinStatusChange: React.PropTypes.func.isRequired,
    onDistanceChange: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      show_pin: false,
      distance: 10
    }
  },

  handleClick(e) {
    this.setState({show_pin: e.target.checked});
    this.props.onPinStatusChange(e.target.checked)
  },

  handleDistance(e) {
    this.setState({
      distance: e.currentTarget.value
    });

    this.props.onDistanceChange(e.currentTarget.value);
  },

  render() {
    return (
      <div className="drop-pin">
        <div className="ui checkbox">
          <input value={this.state.show_pin} checked={this.state.show_pin} onClick={this.handleClick} type="checkbox" />
          <label>Drop a pin and show results within</label>
        </div>
        <div className="ui right labeled input">
          <input type="number" defaultValue={this.state.distance} onChange={this.handleDistance} disabled={this.state.show_pin == false} />
          <div className="ui basic label">
            km
          </div>
        </div>
      </div>
    )
  }
});

module.exports = DropPin;