var React = require('react');

var Counter = React.createClass({
  render: function() {
    return (
      <div>
        <div className="counter-container settings">
          <div>Total tweets on the map: <span className="stat-number">{this.props.number}</span></div>
        </div>
      </div>
    )
  }
});

module.exports = Counter;