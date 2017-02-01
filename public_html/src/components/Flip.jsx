var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

class Flip extends React.Component {
  constructor(props) {
    super(props);
  }
  flipButtonClick() {
    if (SymptomChecker.locked() === false) {
      SymptomChecker.ariaMsg("changed flip");
      if (SymptomChecker.bodyType === 'Male') {
        //Front Side
        if (SymptomChecker.male_front) {

          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackHead, {
              factor: true
            });
            $('.head.back').css('display', 'block');
            $('.head.front').css('display', 'none');
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackBody);
            $('.fullbody.back').css('display', 'block');
            $('.fullbody.front').css('display', 'none');
          }
        } else {
          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontHead, {
              factor: true
            });
            $('.head.back').css('display', 'none');
            $('.head.front').css('display', 'block');
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontBody);
            $('.fullbody.front').css('display', 'block');
            $('.fullbody.back').css('display', 'none');
          }
        }
        SymptomChecker.male_front = !SymptomChecker.male_front;
        SymptomChecker.female_front = !SymptomChecker.female_front;
      //FEMALE     
      } else {
        SymptomChecker.setBodyType(SymptomChecker.typeFemale);
        if (SymptomChecker.female_front) {
          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackHead, {
              factor: true
            });
            $('.head.back').css('display', 'block');
            $('.head.front').css('display', 'none');
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackBody);
            $('.fullbody.back').css('display', 'block');
            $('.fullbody.front').css('display', 'none');
          }
        } else {
          if (SymptomChecker.headMode) {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontHead, {
              factor: true
            });
            $('.head.back').css('display', 'none');
            $('.head.front').css('display', 'block');
          } else {
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontBody);
            $('.fullbody.back').css('display', 'none');
            $('.fullbody.front').css('display', 'block');
          }
        }
        SymptomChecker.male_front = !SymptomChecker.male_front;
        SymptomChecker.female_front = !SymptomChecker.female_front;
      }
    }
  }
  render() {
    return null
  }
}
;
export default Flip;