var React = require('react');

class SideButtonsLeft extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div data-position="fixed" id="side-buttons-left" className="side-buttons">
        <div aria-pressed="false" id="male-button" tabIndex="0" className="small-button">
          <img role="button" className="sm-male" src="../images/small-male-body.png" aria-label="choose male avatar" />
          <h4 className="button-text button-text--male" aria-label="Male">Male</h4>
        </div>
        <div data-position="fixed" aria-pressed="false" id="female-button" tabIndex="0" className="small-button">
          <img role="button" className="sm-female" src="../images/small-female-body.png" aria-label="choose female avatar" />
          <h4 className="button-text button-text--female" aria-label="Female">Female</h4>
        </div>
      </div>
    )
  }
}
;

export default SideButtonsLeft;