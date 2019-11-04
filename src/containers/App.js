import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import routes from '../route';
import RenderRoutes from '../common/routes';
import { getInfo } from '../actions/user.action';
import MenuAppBar from '../components/MenuAppBar';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount = () => {
    const {getProfile} = this.props;
    getProfile()
  }

  render(){
    const {loggedIn} = this.props;
    const {loading} = this.state;
    return (
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
    user: user.user
  };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      getProfile: getInfo
  },dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
