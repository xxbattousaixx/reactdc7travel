import React from "react";
import { hydrate, render } from 'react-dom';
import reportWebVitals from './reportWebVitals.js';
import { Authenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // default theme

import App from './App';

const root = document.getElementById("root");
console.log = function() {} 
if (root.hasChildNodes()) {
  hydrate(<Authenticator.Provider>
    <View><App/>  </View>
    </Authenticator.Provider> 
    , root);
} else {
  render(<Authenticator.Provider>
    <View><App/></View>
    </Authenticator.Provider>,
     root);}

     reportWebVitals();