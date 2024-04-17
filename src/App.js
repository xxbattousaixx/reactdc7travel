import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { history } from './helpers/history.js';
import './App.css';
import React from 'react';
import CreateTrip from './components/CreateTrip.js';
import ShowTripList from './components/ShowTripList.js';
import ShowTripDetails from './components/ShowTripDetails.js';
import ShowPublicTrip from './components/ShowPublicTrip.js';
import ShowPublicProfile from './components/ShowPublicProfile.js';
import Dashboard from './components/Dashboard.js';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

import UpdateTripInfo from './components/UpdateTripInfo.js';
import UpdateProfileInfo from './components/UpdateProfileInfo.js';
import ShowProfile from './components/ShowProfile.js';


import Profile from './components/Profile.js';
import Login from './components/Login.js';
// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }
// import MyComponent
const App = () => {
  
  
  return (
    <Router history={history}>
       <AuthProvider>
        <Routes>
      
          <Route   path='/' element={<ShowTripList />}/>
          <Route  path='/create-trip' element={<ProtectedRoute><CreateTrip /></ProtectedRoute>}/>
          <Route  path='/create-profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route  path='/edit-profile/:id' element={<ProtectedRoute><UpdateProfileInfo/></ProtectedRoute>}/>

          <Route  path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route  path='/login' element={<Login/>}/>


          <Route  path='/edit-trip/:id' element={<ProtectedRoute><UpdateTripInfo /></ProtectedRoute>}/>
          <Route  path='/show-profile/:id' element={<ProtectedRoute><ShowProfile /></ProtectedRoute>}/>
          <Route  path='/show-profileinfo/:id' element={<ShowPublicProfile/>}/>


          <Route  path='/show-trip/:id' element={<ProtectedRoute><ShowTripDetails /></ProtectedRoute>}/>
          <Route  path='/show-tripinfo/:id' element={<ShowPublicTrip />}/>

        </Routes>
    </AuthProvider>

    </Router>
  );
};

export default App;