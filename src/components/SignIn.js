import React from 'react';
import LoginForm from '../containers/LoginForm';

export default function Login(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6"></div>
                <div className="col-12 col-sm-6">
                        <div className="game-info-heading text-center">SIGN IN</div>
                        <LoginForm/>
                </div>
            </div>
        </div>
    );
} 