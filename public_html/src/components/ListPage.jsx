var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';
import $ from 'jquery';

import TopNav from './TopNav';
import SearchBox from './SearchBox';
import List from './List';

/**
 * 
 * @class ListPage - ListPage component
 */
class ListPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //SymptomChecker.showSpinner();
    //                    setTimeout(function () {
    //                    $.when(ApiMethods.checkTopicTableAdultFiltered('#list-query-listing-items', SymptomChecker.avatarObject.gender, SymptomChecker.avatarObject.filter[SymptomChecker.locked_id], SymptomChecker.avatarObject.value[SymptomChecker.locked_id], SymptomChecker.avatarObject.keywords[SymptomChecker.locked_id][SymptomChecker.language])).then(function () {
    //                    SymptomChecker.hideSpinner();
    //                            //showListPage();
    //    //                $.mobile.changePage("#list-page", {transition: 'fade'});
    //                            SymptomChecker.selectButton('.showlist');
    //                            this.unlock();
    //                            this.hilightOff();
    //                            SymptomChecker.focusIt("li:first-child a");
    //                    });
    //                    }, 2000);
  }
  render() {
    return (
      <div>
        <TopNav setPage={ this.props.setPage } />
        <SearchBox />
        <List />
      </div>
    )
  }
}
export default ListPage;