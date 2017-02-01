var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

class DisclaimerLink extends React.Component {
  constructor(props) {
    super(props);

    this.disclaimerLinkClick = this.disclaimerLinkClick.bind(this);
  }
  disclaimerLinkClick() {
    this.props.setPage('Disclaimer');
  }

  disclaimerOpen() {
    Common.debugMessage('disclaimerOpen called');
    if (SymptomChecker.locked() === false) {
      if (SymptomChecker.language === 'es') {
        //                $.mobile.changePage("#disclaimer-page-es", {transition: 'fade'});
      } else {
        //                $.mobile.changePage("#disclaimer-page", {transition: 'fade'});
      }
      $("#disclaimer").toggle();
      SymptomChecker.focusIt("#disclaimer h2");
    }
  }

  render() {
    return (
      <div id="botwrap">
        <a href="#" id="disclaimer-link" className="open-disclaimer" onClick={ this.disclaimerLinkClick }>Disclaimer</a>
      </div>
    )
  }
}
;
export default DisclaimerLink;