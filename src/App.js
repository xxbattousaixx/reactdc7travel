import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import React from 'react';
import CreateTrip from './components/CreateTrip.js';
import ShowTripList from './components/ShowTripList.js';
import ShowTripDetails from './components/ShowTripDetails.js';
import ShowPublicTrip from './components/ShowPublicTrip.js';
import ShowPublicProfile from './components/ShowPublicProfile.js';
import Dashboard from './components/Dashboard.js';


import UpdateTripInfo from './components/UpdateTripInfo.js';
import UpdateProfileInfo from './components/UpdateProfileInfo.js';
import ShowProfile from './components/ShowProfile.js';


import Profile from './components/Profile.js';

import Login from './components/Login.js';
// import MyComponent
const App = () => {
  return (
    <Router>
        <Routes>
      
          <Route exact  path='/' element={<ShowTripList />}/>
          <Route exact path='/create-trip' element={<CreateTrip />}/>
          <Route  path='/create-profile' element={<Profile />}/>
          <Route  path='/edit-profile/:id' element={<UpdateProfileInfo/>}/>

          <Route  path='/dashboard' element={<Login/>}/>


          <Route  path='/edit-trip/:id' element={<UpdateTripInfo />}/>
          <Route  path='/show-profile/:id' element={<ShowProfile />}/>
          <Route  path='/show-profileinfo/:id' element={<ShowPublicProfile/>}/>


          <Route  path='/show-trip/:id' element={<ShowTripDetails />}/>
          <Route  path='/show-tripinfo/:id' element={<ShowPublicTrip />}/>

        </Routes>
    </Router>
  );
};

export default App;