import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {PrivateRoute} from './PrivateRoute';
import GameContainer from '../containers/Game';
import Dashboard from '../components/Dashboard';

export const renderComponent = (route, match, history) => {
  class RouteContent extends React.Component {
    componentWillMount() {
      if(route.preProcess) route.preProcess();
    }

    render() {
      return (
        <route.component 
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        match={match} 
        history={history} 
        routes={route.routes}  />
      );
    }
  }

  return <RouteContent />;
};

const RenderRoutes  = (props)=> {
  const {routes} = props;
  const {user} = props;
  return routes
    ? 
    <BrowserRouter>
        <Switch>
        {
          routes.map((route, i) => {
            const id = {i};
            return(
            <Route
              key={id}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              routes={route.routes}
              render={({ match, history  }) => renderComponent(route, match, history)}
            />
          )})
        }
        <PrivateRoute path='/' user={user} component={Dashboard}/>
      </Switch>
      </BrowserRouter>
    : null;
};
const mapStateToProps = state => {
  return({ user: state.user })
};
export default connect(mapStateToProps)(RenderRoutes);