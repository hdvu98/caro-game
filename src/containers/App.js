import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import routes from '../route';
import RenderRoutes from '../common/routes';
import '../style/Game.css';
import { getInfo } from '../actions/user.action';

class App extends React.Component {

  componentDidMount = () => {
    const {getProfile} = this.props;
    getProfile()
  }

  render(){
    return (
      <div className="App">
      <div className="container-page">
        <RenderRoutes routes={routes}/>
      </div>
      </div>
    );
  }
}
const mapStateToProps=(state)=> {
  const {user} = state;
  return {
    loggedIn  : user.loggedIn
  };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      getProfile: getInfo
  },dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
