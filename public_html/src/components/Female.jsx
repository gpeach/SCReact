var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

class Female extends React.Component {
  constructor(props) {
    super(props);
  }
  femaleButtonClick() {
    if (SymptomChecker.locked() === false) {
      SymptomChecker.setBodyType(SymptomChecker.typeFemale);
      if (SymptomChecker.female_front) {
        if (SymptomChecker.headMode) {
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontHead, {
            factor: true
          });
        } else {
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontBody);
        }
      } else {
        if (SymptomChecker.headMode) {
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackHead, {
            factor: true
          });
        } else {
          SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackBody);
        }
      }
      SymptomChecker.ariaMsg("changed to female body view");
    }
  }
  render() {
    return null
  }
}
;
export default Female;