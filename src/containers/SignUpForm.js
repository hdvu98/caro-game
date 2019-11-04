/* eslint-disable camelcase */
import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {TextField,FormControl,FormControlLabel,RadioGroup,Radio, FormLabel, IconButton} from '@material-ui/core';
import {Visibility,VisibilityOff} from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {register} from '../actions/user.action';

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            gender: "male",
            showPassword1: false,
            showPassword2: false
          }
    }
   
    handleChange = async event => {
        if(event.target.name === 'confirmPassword' ){
            const {password} = this.state;
            const {value} = event.target;
            if(value !== password){
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
    
    handleSubmit = event => {
        const {callRegister} = this.props;
        event.preventDefault()
        const {username, password, full_name, dob, gender, errorMessage} = this.state;
        const user= {username, password, full_name, dob, gender};
        if( !errorMessage && username && password && full_name && dob && gender){
            callRegister(user);
        }
    }

    handleDateChange = async date => {
        const result = await format(
            date,
            'MM/dd/yyyy'
          );
        this.setState({...this.state, dob:result});
      };

    handleClickShowPassword1 = () => {
    this.setState({ ...this.state, showPassword1: !this.state.showPassword1 });
    };

    handleClickShowPassword2 = () => {
        this.setState({ ...this.state, showPassword2: !this.state.showPassword2 });
        };
    
    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    render() {
        const {errorMessage,dob, gender} = this.state
        const {from} = this.props.location || {from: {pathname: "/"}};
        const {loggedIn} = this.props.user;
        const {pathname} = from;
        const {showPassword1,showPassword2} = this.state;

        if(loggedIn)
        {
         return <Redirect to={pathname} />
        }

        return (
            <form className="d-flex flex-column align-items-center d-block">
                 <div className="d-block">
                <TextField  className="field-width" type="username" name="username" onChange={this.handleChange} placeholder="Username" id="input-with-icon-grid" label="Username" />
                </div>
                <FormControl className="mt-10">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        className="field-width"
                        name="password"
                        id="standard-adornment-password"
                        type={showPassword1 ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword1}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                    />
                </FormControl>
                <FormControl  className="mt-10" >
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input
                        className="field-width"
                        name="confirmPassword"
                        id="standard-adornment-password"
                        type={showPassword2 ? 'text' : 'password'}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword2}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {showPassword2 ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                    />
                </FormControl>
            <div className="d-block">
            <TextField  className="field-width mt-10" type="text" name="full_name" value={this.state.full_name} onChange={this.handleChange} placeholder="Full Name" id="input-with-icon-grid" label="Full name" />
            </div>
            
            <FormControl   className="field-width mt-15" controlId="formHorizontalGender">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleChange}
                className ="d-flex flex-row justify-content-start" label="Gender"
                >
                    <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                        labelPlacement="start"
                    />
            </RadioGroup>
            </FormControl >

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className="field-width"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date of birth"
                        format="MM/dd/yyyy"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
           
            <button type="submit" className="my-btn" onClick={(event) => this.handleSubmit(event)}>Update</button>
            <div className="sns-title">Have an account?<a href="/login" className="link">Sign in</a></div>
            {errorMessage &&
            <p style={{color:'red'}}>{errorMessage}</p>
            }
        </form>
            // <Form >
            //     <FormGroup controlId="formHorizontalEmail">
            //         <FormLabel>Username </FormLabel>
            //         <FormControl type="username" name="username" onChange={this.handleChange} placeholder="Username" />
            //     </FormGroup>
            //     <FormGroup controlId="formHorizontalPassword">
            //         <FormLabel>Password </FormLabel>
            //         <FormControl type="password" name="password" onChange={this.handleChange} placeholder="Password" />
            //     </FormGroup>
            //     <FormGroup controlId="formHorizontalPassword2">
            //         <FormLabel>Confirm Password </FormLabel>
            //         <FormControl type="password" name="confirmPassword" onChange={this.handleChange} placeholder="Password" />
            //     </FormGroup>
            //     <FormGroup controlId="formHorizontalName">
            //         <FormLabel>Full Name </FormLabel>
            //         <FormControl type="text" name="full_name" onChange={this.handleChange} placeholder="Full Name" />
            //     </FormGroup>
            //     <FormGroup controlId="formHorizontalGender">
            //         <FormLabel>Gender </FormLabel>
            //         <RadioGroup aria-label="gender" name="gender" value={gender} onChange={this.handleChange}
            //         className ="d-flex flex-row justify-content-start"
            //         >
            //             <FormControlLabel
            //                 value="female"
            //                 control={<Radio color="primary" />}
            //                 label="Female"
            //                 labelPlacement="start"
            //             />
            //             <FormControlLabel
            //                 value="male"
            //                 control={<Radio color="primary" />}
            //                 label="Male"
            //                 labelPlacement="start"
            //             />
            //     </RadioGroup>
            //     </FormGroup>

            //     <Row>
            //         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            //             <KeyboardDatePicker
            //                 margin="normal"
            //                 id="date-picker-dialog"
            //                 label="Date of birth"
            //                 format="MM/dd/yyyy"
            //                 value={dob}
            //                 onChange={this.handleDateChange}
            //                 KeyboardButtonProps={{
            //                     'aria-label': 'change date',
            //                 }}
            //             />
            //         </MuiPickersUtilsProvider>
            //     </Row>
               
            //     <Button onClick={(event) => this.handleSubmit(event)}>Sign Up</Button>
            //     {errorMessage &&
            //     <p style={{color:'red'}}>{errorMessage}</p>
            //     }
            // </Form>
        )
    }
}

const mapStateToProps = state =>({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        callRegister: register
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);