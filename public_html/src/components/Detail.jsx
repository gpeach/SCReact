var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';


class Detail extends React.Component {
  constructor(props) {
    super(props);
  }
  addBottomAnchoredNav() {
    //Bottom Anchored Nav
    $("#detail-page").append('<div role="navigation" id="anchor-menu-sc">\
<a id="back-link" href="#"><img aria-label="go back" src="../images/detail/back.png" ></a> \
<a id="symptoms-link" href="#" class="scroll"><img aria-label="symptoms" src="../images/detail/symptoms.png" ></a> \
<a id="whentocall-link" href="#" class="scroll"><img aria-label="when to call" src="../images/detail/call.png" ></a> \
<a id="careathome-link" href="#" class="scroll"><img aria-label="care at home" src="../images/detail/care.png" ></a>\
</div>');
  }

  removeBottomAnchoredNav() {
    $("#anchor-menu-sc").remove();
  }

  externalLinkClick(e) {
    var addressValue = this.href;
    Common.debugMessage('external clicked ' + addressValue);
    if (/Android/i.test(navigator.userAgent)) {
      e.preventDefault();
      Android.openBrowser(addressValue);
    }
  }

  droidClick() {
    Common.debugMessage('Android.startSAV()');
    Android.startSAV();
  //        $.mobile.changePage("#list-page", {transition: 'fade'});
  }

  render() {
    return <div>symptom details</div>
  }
}
;

export default Detail;