import React from 'react';
import LoginForm from '../containers/LoginForm';

export default function Login(){
    return (
        <div className="container">
            <div  id="form-ui">
                <div className="form-name text-center">SIGN IN</div>
                <LoginForm/>
            </div>
        </div>
    );
} 