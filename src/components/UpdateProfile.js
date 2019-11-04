import React from 'react';
import EditProfile from '../containers/EditProfile';

export default function Login(){
    return (
        <div className="container">
            <div  id="form-ui">
                <div className="form-name text-center">Profile</div>
                <EditProfile/>
            </div>
        </div>
    );
} 