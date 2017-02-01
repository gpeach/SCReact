var React = require('react');

class SideButtonsRight extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="side-buttons-right" className="side-buttons">
        <div aria-pressed="false" tabIndex="0" id="zoom-button" className="small-button">
          <img role="button" src="../images/icon-zoom-in.png" alt="zoom avatar in to head view or out to full body view" />
          <h4 className="button-text button-text--zoom" aria-label="Zoom">Zoom</h4>
        </div>
        <div aria-pressed="false" tabIndex="0" id="flip-button" className="small-button">
          <img role="button" src="../images/icon-flip.png" alt="Flip avatar between front and back view" />
          <h4 className="button-text button-text--flip" aria-label="Flip">Flip</h4>
        </div>
      </div>
    )
  }
}
;

export default SideButtonsRight;