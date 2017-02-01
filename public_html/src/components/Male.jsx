var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

class Male extends React.Component {
  constructor(props) {
    super(props);

  //this.maleButtonClick = this.maleButtonClick.bind(this);
  }
  maleButtonClick() {
    Common.debugMessage('maleButtonClick called');
    Common.debugMessage(SymptomChecker.locked());
    Common.debugMessage(SymptomChecker.male_front);
    Common.debugMessage(SymptomChecker.headMode);
    if (SymptomChecker.locked() == false) {
      SymptomChecker.setBodyType(SymptomChecker.typeMale);
      if (SymptomChecker.male_front) {
        if (SymptomChecker.headMode) {
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontHead, {
            factor: true
          });
        } else {
          Common.debugMessage(SymptomChecker.femaleBackBody);
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontBody);
        }
      } else {
        if (SymptomChecker.headMode) {
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackHead, {
            factor: true
          });
        } else {
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackBody);
        }
      }
      SymptomChecker.ariaMsg("changed to male body view");
    }
  }
  render() {
    return null
  }
}
;
export default Male;