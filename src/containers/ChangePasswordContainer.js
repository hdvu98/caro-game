import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import {FormControl, IconButton, InputAdornment,Input,InputLabel} from '@material-ui/core';
import {Visibility,VisibilityOff} from '@material-ui/icons';

import {changePassword} from '../actions/user.action';

class ChangePasswordContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            password: "",
            newPassword: "",
            confirmNewPassword: "",
            showConfirmPassword: false,
            showCurPassword: false,
            showNewPassword: false
        }
    }
   
    handleChange = async event => {
        if(event.target.name === 'confirmPassword' ){
            const {newPassword} = this.state;
            const {value} = event.target;
            if(value !== newPassword){
                const errorMessage = 'please make sure your password match!';
                this.setState({...this.state, errorMessage})
            }
            else{
                this.setState({...this.state, errorMessage: undefined})
            }
        }
        else{
            this.setState({...this.state,
                [event.target.name]: event.target.value,
            });
         }      
    }

    handleClickShowPassword = () => {
        this.setState({ ...this.state, showCurPassword: !this.state.showCurPassword });
    };

    handleClickShowNewPassword = () => {
        this.setState({ ...this.state, showNewPassword: !this.state.showNewPassword });
    };

    handleClickShowConfirmPassword = () =>{
        const state = this.state;
        this.setState({...state, showConfirmPassword: !state.showConfirmPassword})
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const {resetPassword} = this.props;
        const curUser = this.props.user;
        const {user} = curUser;
        const {username} = user;
        const {password, newPassword,errorMessage} = this.state;
        const newUser= {username, password, newPassword};
        console.log(newUser);
        if( !errorMessage && username && password && newPassword ){
            resetPassword(newUser);
        }
    }

    render() {
        const {errorMessage,showConfirmPassword,showNewPassword,showCurPassword} = this.state
        const {from} = this.props.location || {from: {pathname: "/"}};
        const {loggedIn} = this.props.user;
        const {pathname} = from;


        return (
            <form className="d-flex flex-column align-items-center d-block">
                 <FormControl className="mt-10" >
                    <InputLabel htmlFor="standard-adornment-password">Current Password</InputLabel>
                    <Input
                        className="field-width"
                        name="password"
                        id="standard-adornment-password"
                        type={showCurPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showCurPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                    />
                </FormControl>
                <FormControl className="mt-10">
                    <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                    <Input
                        className="field-width"
                        name="newPassword"
                        id="standard-adornment-password"
                        type={showNewPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowNewPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                    />
                </FormControl>
                <FormControl className="mt-10" >
                    <InputLabel htmlFor="standard-adornment-password">Confirm New Password</InputLabel>
                    <Input
                        className="field-width"
                        name="confirmPassword"
                        id="standard-adornment-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowConfirmPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                    />
                </FormControl>
                <button type="submit" className="my-btn" onClick={(event) => this.handleSubmit(event)}>Update</button>   
                {errorMessage &&
                <p style={{color:'red'}}>{errorMessage}</p>
                }
            </form>
        )
    }
}

const mapStateToProps = state =>({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        resetPassword:changePassword
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer);