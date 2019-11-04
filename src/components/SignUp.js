import React from 'react';
import SignUpForm from '../containers/SignUpForm';

export default function SignUp(){
    return (
        <div className="container">
            <div id="form-ui">
            <div className="form-name text-center">CREATE A NEW ACCOUNT</div>
            <SignUpForm/>
            </div>
        </div>
    );
} 