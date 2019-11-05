import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import routes from '../route';
import RenderRoutes from '../common/routes';
import { getInfo } from '../actions/user.action';
import MenuAppBar from '../components/MenuAppBar';

class App extends React.Component {

  componentDidMount = () => {
    const {getProfile} = this.props;
    getProfile()
  }

  render(){
    const {loading} = this.props;
    return loading?<div>loading</div>:(
      <div className="App">
        <MenuAppBar/>
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
    loggedIn  : user.loggedIn,
    user: user.user,
    loading: user.loading
  };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      getProfile: getInfo
  },dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
