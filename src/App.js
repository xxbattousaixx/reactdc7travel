import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateTrip from './components/CreateTrip';
import ShowTripList from './components/ShowTripList';
import ShowTripDetails from './components/ShowTripDetails';
import UpdateTripInfo from './components/UpdateTripInfo';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowTripList />} />
          <Route path='/create-trip' element={<CreateTrip />} />
          <Route path='/login' element={<Login />} />

          <Route path='/edit-trip/:id' element={<UpdateTripInfo />} />
          <Route path='/show-trip/:id' element={<ShowTripDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;