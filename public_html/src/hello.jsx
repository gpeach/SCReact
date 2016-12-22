var React = require('react');
var ReactDOM = require('react-dom');
require('../scss/style.scss');

var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('container')
);