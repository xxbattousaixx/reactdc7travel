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
    
    <div className='ShowTripList' style={{
      backgroundImage: "url(" + require("/src/img/bg4.jpg") + ")",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center"
    }}>
      <div className='container'>
      <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>DC7 TRAVEL BLOG</h2>
          </div>
        <br/>
    <Authenticator>

      <Dashboard/>
      </Authenticator>
    
      </div>
  
    </div>
  );
}

export default Login;