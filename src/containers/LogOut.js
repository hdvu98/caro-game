import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {logOut} from "../actions/user.action";

class LogoutPage extends Component {

    componentWillMount() {
      const {callLogOut} = this.props;
      callLogOut();
    }
  
    render() {
      return (
        <Redirect to="/login" />
      );
    }
  
  }

const propTypes = {
    dispatch: PropTypes.func.isRequired
  };

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        callLogOut: logOut
    },dispatch);
}

export default connect(null, mapDispatchToProps)(LogoutPage);