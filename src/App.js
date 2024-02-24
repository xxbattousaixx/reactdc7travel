import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import React from 'react';
import CreateTrip from './components/CreateTrip.js';
import ShowTripList from './components/ShowTripList.js';
import ShowTripDetails from './components/ShowTripDetails.js';
import ShowPublicTrip from './components/ShowPublicTrip.js';
import ShowPublicProfile from './components/ShowPublicProfile.js';


import UpdateTripInfo from './components/UpdateTripInfo.js';
import UpdateProfileInfo from './components/UpdateProfileInfo.js';
import ShowProfile from './components/ShowProfile.js';


import Profile from './components/Profile.js';

import Login from './components/Login.js';
// import MyComponent
const App = () => {
  return (<>
    <Router>
        <Routes>
      
          <Route exact  path='/' element={(props) => <ShowTripList {...props} />}/>
          <Route exact path='/create-trip' element={(props)=><CreateTrip {...props}/>}/>
          <Route exact path='/create-profile' element={(props)=><Profile {...props}/>}/>
          <Route exact path='/edit-profile/:id' element={(props)=><UpdateProfileInfo {...props}/>}/>

          <Route exact path='/dashboard' element={(props)=><Login {...props}/>}/>

          <Route exact path='/edit-trip/:id' element={(props)=><UpdateTripInfo {...props}/>}/>
          <Route exact path='/show-profile/:id' element={(props)=><ShowProfile {...props}/>}/>
          <Route exact path='/show-profileinfo/:id' element={(props)=><ShowPublicProfile {...props}/>}/>


          <Route exact path='/show-trip/:id' element={(props)=><ShowTripDetails {...props}/>}/>
          <Route exact path='/show-tripinfo/:id' element={(props)=><ShowPublicTrip {...props}/>}/>

        </Routes>
    </Router></>
  );
};

export default App;