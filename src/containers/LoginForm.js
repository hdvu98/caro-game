/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {Row} from 'react-bootstrap';
import {FilledInput,IconButton} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {AccountCircle,VpnKeyRounded, Visibility, VisibilityOff} from '@material-ui/icons';
import {login} from '../actions/user.action';


class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            showPassword: false
          }
    }
   

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        const {callLogin} = this.props;
        const {username,password} = this.state;
        const user = {username,password} ;
        event.preventDefault()
        callLogin(user);
    }

    handleClickShowPassword = () => {
        this.setState({ ...this.state, showPassword: !this.state.showPassword });
      };
    
    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    
    render() {
        const {from} = this.props.location || {from: {pathname: "/"}};
        const {errorMessage} = this.props
        const {loggedIn} = this.props.user;
        const {pathname} = from;
        const {showPassword} = this.state;
        const {loginMsg} = this.props;
        if(loggedIn)
        {
         return <Redirect to={pathname} />
        }
        return (
            <form className="d-flex flex-column align-items-center d-block">
                <div className="d-block">
                <TextField className="field-width" type="username" name="username" onChange={this.handleChange} placeholder="Username" id="input-with-icon-grid" label="Username" />
                </div>
                <FormControl className="mt-10" >
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        name="password"
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        className="field-width"
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton 
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                          }
                    />
                </FormControl>
                    {errorMessage &&
                    <p style={{color:'red'}}>{errorMessage}</p>
                    }
                    {loginMsg && <div className="alert  alert-primary" role="alert">{loginMsg}</div>}
                    <Row >
                        <button type="submit" className="my-btn form-btn"onClick={(event) => this.handleSubmit(event)}>Login</button>
                    </Row>
                    <div className="sns-title">Don't have an account?<a href="/register" className="link">Sign Up</a></div>
                    <div className="other">or Connect with Social Media</div>
                    <div className="d-flex flex-column">
                        <button type="button" className="my-btn fb-btn"><i className="fab fa-facebook-f"></i><span className="btn-content">Sign in With Facebook</span></button>
                        <button type="button" className="my-btn google-btn"><i className="fab fa-google"></i><span className="btn-content">Sign in With Google</span></button>
                    </div>
                </form>
        )
    }
}
const mapStateToProps = state =>({
    user: state.user,
    loginMsg: state.user.loginMsg
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        callLogin: login
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);