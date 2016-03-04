var React = require('react');

var Accordion = React.createClass({
  componentDidMount() {
    $('.ui.accordion')
      .accordion();
  },

  render: function() {
    return (
      <div className="ui accordion field">
        <div className="title">
          <i className="icon dropdown"></i>
          {this.props.title}
        </div>
        <div className="content field active">
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Accordion;