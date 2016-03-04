var React = require('react');
var ToggleDisplay = require('react-toggle-display');

var UpdateSetting = React.createClass({
  propTypes: {
    onCheck: React.PropTypes.func.isRequired
  },

  getInitialState(){
    return {
      isAuto: false
    }
  },

  handleCheckAuto(event){
    var nextState = !this.state.isAuto;
    this.setState({
      isAuto: nextState
    });
    this.props.onCheck(nextState);
  },

  render(){
    return (
      <div className="update-setting">
        <div className="ui checkbox">
          <input value={this.state.isAuto} checked={this.state.isAuto} onClick={this.handleCheckAuto} type="checkbox" />
          <label>Update Tweets Automatically</label>
        </div>
      </div>
    );
  }
});


module.exports = UpdateSetting;