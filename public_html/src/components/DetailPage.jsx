var React = require('react');
import Detail from './Detail';
import GoBack from './GoBack';
import Symptoms from './Symptoms';
import WhenToCall from './WhenToCall';
import CareAtHome from './CareAtHome';


class DetailPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Detail />
        <GoBack setPage={ this.props.setPage } />
        <Symptoms />
        <WhenToCall />
        <CareAtHome />
      </div>
    )
  }
}
;

export default DetailPage;