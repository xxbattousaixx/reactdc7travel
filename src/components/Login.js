import React, { useState, useEffect } from 'react';
import '../App.css';
import Dashboard from './Dashboard';
import { Amplify } from 'aws-amplify';
//2.
import awsExports from '../aws-exports';
//3.
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

//4.
Amplify.configure(awsExports)



function Login() {
    
  return (
    <div className='ShowTripList'>
      <div className='container'>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <Dashboard/>
    
      </div>
  
    </div>
  );
}

export default Login;