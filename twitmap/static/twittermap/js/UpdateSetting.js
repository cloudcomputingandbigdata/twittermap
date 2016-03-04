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
      <div className="update-setting settings">
        <div className="ui checkbox">
          <input value={this.state.isAuto} checked={this.state.isAuto} onClick={this.handleCheckAuto} type="checkbox" />
          <label>Update tweets automatically</label>
        </div>
      </div>
    );
  }
});


module.exports = UpdateSetting;