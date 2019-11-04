import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const PrivateRoute = ({ component: Component, user, ...rest }) => {
    return(
    <Route
      {...rest}
      render={props =>
        user.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}  />
        )
      }
    />
  )};
  

PrivateRoute.prototype = ( {
    user: PropTypes.object.isRequired
})
