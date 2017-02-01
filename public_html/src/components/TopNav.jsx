var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.showButtonClick = this.showButtonClick.bind(this);
    this.listButtonClick = this.listButtonClick.bind(this);
  }
  showBodyClick() {
    if (SymptomChecker.locked() === false) {
      Common.debugMessage('body click fired');
      //            $(":mobile-pagecontainer").pagecontainer("change", $("#home-page"));

      //$.mobile.changePage("#home-page", {transition: 'fade'});
      SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.avatarObject);
      SymptomChecker.selectButton('.showbody');
      SymptomChecker.clearResults();
      SymptomChecker.focusIt(".showbody");
      SymptomChecker.ariaMsg("body view selected");
    }
  }
  showButtonClick() {
    this.props.setPage('Avatar');
  }
  showListClick() {
    if (SymptomChecker.locked() == false) {
      Common.debugMessage('list click fired');
      //            $.mobile.changePage("#list-page", {transition: 'fade'});
      ApiMethods.genBodyAreaList("#list-query-listing-items");
      SymptomChecker.selectButton('.showlist');
      SymptomChecker.focusIt("li:first-child a");
      SymptomChecker.ariaMsg("list view selected");
    }
  }
  listButtonClick() {
    this.props.setPage('List');
  }
  render() {
    return (
      <div id="avatar-page-topnav" className="button-select">
        <a href="javascript:void(0)" aria-label="Switch to the body view" aria-selected="true" tabIndex="0" className="showbody button-selected" onClick={ this.showButtonClick }> Body </a>
        <a aria-label="switch to the list view" href="javascript:void(0)" aria-selected="false" className="showlist" onClick={ this.listButtonClick }> List </a>
      </div>
    )
  }
}
;

export default TopNav;