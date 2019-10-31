import React, { Component } from 'react'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, FormLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import {login} from '../actions/user.action';


class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
          }
    }
   

    handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
    }

    handleSubmit = event => {
        const {callLogin} = this.props;
        event.preventDefault()
        callLogin(this.state)
    }
    
    render() {
        const {errorMessage} = this.props

        return (
            <Form >
                <FormGroup controlId="formHorizontalEmail">
                    <FormLabel>Username </FormLabel>
                    <FormControl type="username" name="username" onChange={this.handleChange} placeholder="Username" />
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <FormLabel>Password </FormLabel>
                    <FormControl type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                <Button onClick={(event) => this.handleSubmit(event)}>Login</Button>
                {errorMessage &&
                <p style={{color:'red'}}>{errorMessage}</p>
                }
            </Form>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        callLogin: login
    },dispatch);
}

export default connect(null, mapDispatchToProps)(LoginForm);