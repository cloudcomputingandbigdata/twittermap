var React = require('react');

var Menu = React.createClass({
  getInitialState: function() {
    return {
      visible: true
    };
  },

  toggle: function() {
    this.setState({ visible: !this.state.visible });
  },

  render: function() {
    return (
      <div>
        <div className="menu-container">
          <div className={"bars " + (this.state.visible ? "visible " : "") + this.props.alignment} onClick={this.toggle}>
            <i className={"fa " + (this.state.visible ? "fa-chevron-right " : "fa-chevron-left ") + "fa-3"}></i>
          </div>
          <div className={"menu " + (this.state.visible ? "visible " : "") + this.props.alignment}>
            <div className="header"><b>{this.props.header}</b></div>
            <div className="main">{this.props.children}</div>
            <div className="footer">{this.props.footer}</div>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = Menu;