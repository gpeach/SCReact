var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

import TopNav from './TopNav';
import SideButtonsLeft from './SideButtonsLeft';
import SideButtonsRight from './SideButtonsRight';
import Avatar from './Avatar';
import DisclaimerLink from './DisclaimerLink';

class AvatarPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var CurrentPage = this.props.CurrentPage;
    return (
      <div id="avatar-page">
        <TopNav setPage={ this.props.setPage } />
        <SideButtonsLeft setAvatar={ this.setAvatar } gender={ this.props.gender } />
        <SideButtonsRight setAvatar={ this.setAvatar } />
        <Avatar gender={ this.props.gender } setLockedId={ this.props.setLockedId } setPage={ this.props.setPage } setAvatar={ this.props.setAvatar } />
        <DisclaimerLink language={ this.props.language } setPage={ this.props.setPage } />
      </div>
    )
  }
}
;

export default AvatarPage;