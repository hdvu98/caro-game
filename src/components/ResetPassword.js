import React from 'react';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';

export default function Login(){
    return (
        <div className="container">
            <div  id="form-ui">
                <div className="form-name text-center">Reset Password</div>
                <ChangePasswordContainer/>
            </div>
        </div>
    );
} 