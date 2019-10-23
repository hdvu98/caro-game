import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Button, FormLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

export default class SignUpForm extends Component {

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const username = findDOMNode(this.refs.username)
    //     const password = findDOMNode(this.refs.password)
    //     const creds = { username: username.value.trim(), password: password.value.trim() }
    //     this.props.onLoginClick(creds)
    // }

    render() {
        const {errorMessage} = this.props

        return (
            <Form >
                <FormGroup controlId="formHorizontalEmail">
                    <FormLabel>Username </FormLabel>
                    <FormControl type="username" ref="username" onChange={this.handleChange} placeholder="Email" />
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <FormLabel>Password </FormLabel>
                    <FormControl type="password" ref="password" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <FormLabel>Confirm Password </FormLabel>
                    <FormControl type="password" ref="password" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                <Button onClick={(event) => this.handleSubmit(event)}>Sign Up</Button>
                {errorMessage &&
                <p style={{color:'red'}}>{errorMessage}</p>
                }
            </Form>
        )
    }
}
