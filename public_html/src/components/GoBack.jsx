var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

class GoBack extends React.Component {
  constructor(props) {
    super(props);

    this.backLinkClick = this.backLinkClick.bind(this);
  }
  backLinkClick() {
    Common.debugMessage($(this).attr('id'));
    $("#list-query-listing-details").removeClass("androidFix");
  //            $.mobile.changePage("#list-page", {transition: 'fade'});
  }
  render() {
    return <button>Go Back</button>
  }
}
;
export default GoBack;