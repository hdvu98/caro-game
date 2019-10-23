import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

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

export const renderRoutes = (routes) => {

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
      </Switch>
      </BrowserRouter>
    : null;
};