var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

class Zoom extends React.Component {
  constructor(props) {
    super(props);
  }
  zoomButtonClick() {
    if (SymptomChecker.locked() === false) {
      $("#zoom-button img").attr("aria-pressed", "true");
      SymptomChecker.ariaMsg("changed zoom");
      var zoomButton = $('#zoom-button img');
      //Toggles the zoom image
      if (SymptomChecker.zoomOut) {
        //Zoom Icon is (+) and is False?
        zoomButton.attr('src', '../images/icon-zoom-in.png');
      } else {
        //Zoom Icon is (-) and is True?
        zoomButton.attr('src', '../images/icon-zoom-out.png');
      }

      //Zoom Back out once Zoomed In
      if (SymptomChecker.bodyType === 'Male') {
        if (SymptomChecker.male_front) {
          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontBody);
            $('.front.fullbody').css('display', 'block');
            $('.front.head').css('display', 'none');
            Common.debugMessage("you should be viewing the BODY FRONT MALE");
            SymptomChecker.male_front = true;
            SymptomChecker.zoomOut = true;
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontHead, {
              factor: true
            });
            $('.front.fullbody').css('display', 'none');
            $('.front.head').css('display', 'block');
            Common.debugMessage("you should be viewing the HEAD FRONT MALE");
          }
        } else {
          // Male Backside
          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackBody);
            $('.back.fullbody').css('display', 'block');
            $('.back.head').css('display', 'none');
            Common.debugMessage("you should be viewing the BODY BACK MALE");
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackHead);
            $('.back.fullbody').css('display', 'none');
            $('.back.head').css('display', 'block');
            Common.debugMessage("you should be viewing the HEAD BACK MALE");
          }
        }
        SymptomChecker.headMode = !SymptomChecker.headMode;
        SymptomChecker.zoomOut = !SymptomChecker.zoomOut;
      } else {
        if (SymptomChecker.female_front) {
          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontBody);
            $('.front.fullbody').css('display', 'block');
            $('.front.head').css('display', 'none');
            Common.debugMessage("you should be viewing the BODY FRONT feMALE");
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontHead, {
              factor: true
            });
            console.info('female_front(main) ' + female_front);
            $('.front.fullbody').css('display', 'none');
            $('.front.head').css('display', 'block');
            Common.debugMessage("you should be viewing the HEAD FRONT feMALE");
          }
        } else {
          // Female Backside 
          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackBody);
            $('.back.fullbody').css('display', 'block');
            $('.back.head').css('display', 'none');
            Common.debugMessage("you should be viewing the BODY BACK feMALE");
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackHead);
            $('.back.fullbody').css('display', 'none');
            $('.back.head').css('display', 'block');
            Common.debugMessage("you should be viewing the HEAD BACK feMALE");
          }
        }
        SymptomChecker.headMode = !SymptomChecker.headMode;
        SymptomChecker.zoomOut = !SymptomChecker.zoomOut;
      }
    }
  }
  render() {
    return null
  }
}
;
export default Zoom;