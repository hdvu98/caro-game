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
        if(loggedIn)
        {
         return <Redirect to={pathname} />
        }
        return (
            <section  className="form d-flex align-items-center flex-column">
            <form className="d-flex-flex-column align-items-center">
                <div className="d-block">
                <TextField type="username" name="username" onChange={this.handleChange} placeholder="Username" id="input-with-icon-grid" label="Username" />
                </div>
                <div className="d-block d-flex flex-row justify-content-start">
                <FormControl >
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                            name="password"
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                    />
                </FormControl>
                    <div style={{marginTop: "5px"}}>
                        <IconButton 
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </div>

                </div>
               
                    {errorMessage &&
                    <p style={{color:'red'}}>{errorMessage}</p>
                    }
                    <Row >
                        <button type="submit" className="w-100 btn btn-prinary"onClick={(event) => this.handleSubmit(event)}>Login</button>
                    </Row>
                </form>
                <div>Don't have an account?<a href="/register">Sign Up now</a></div>
                <div>Or login  with</div>
                <div className="d-flex flex-row justify-content-between">
                    <div>Favebook</div>
                    <div>Google</div>
                </div>
                
            </section>
        )
    }
}
const mapStateToProps = state =>({
    user: state.user
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        callLogin: login
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);