import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from 'react-router-dom';
import { Button, FormLabel, Form, FormControl, FormGroup,Row } from 'react-bootstrap';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import {register} from '../actions/user.action';

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            gender: "male"
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

    render() {
        const {errorMessage,dob, gender} = this.state
        const {from} = this.props.location || {from: {pathname: "/"}};
        const {loggedIn} = this.props.user;
        const {pathname} = from;

        if(loggedIn)
        {
         return <Redirect to={pathname} />
        }

        return (
            <Form >
                <FormGroup controlId="formHorizontalName">
                    <FormLabel>Full Name </FormLabel>
                    <FormControl type="text" name="full_name" onChange={this.handleChange} placeholder="Full Name" />
                </FormGroup>
                <FormGroup controlId="formHorizontalGender">
                    <FormLabel>Gender </FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={gender} onChange={this.handleChange}
                    className ="d-flex flex-row justify-content-start"
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
                </FormGroup>

                <Row>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date of birth"
                            format="MM/dd/yyyy"
                            value={dob}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Row>
               
                <Button onClick={(event) => this.handleSubmit(event)}>Sign Up</Button>
                {errorMessage &&
                <p style={{color:'red'}}>{errorMessage}</p>
                }
            </Form>
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