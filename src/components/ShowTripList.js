import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TripCard from './TripCard';
// import https from 'https';
// const fs = require('fs').promises;
// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false, // (NOTE: this will disable client verification)
//   cert: fs.readFileSync("./usercert.pem"),
//   key: fs.readFileSync("./key.pem"),
//   passphrase: "sayonara"
// })

function ShowTripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const instance = axios.create(
{  baseURL: "https://3.137.136.231:3100/",
withCredentials: false,
headers: {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
  'Content-Type': 'multipart/form-data'
} });
      instance
      .get('/')
      .then((res) => {
        setTrips(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log('Error from ShowTripList');
      });
  }, []);

  const tripList =
    trips.length === 0
      ? 'there is no trip record!'
      : trips.map((trip, k) => <TripCard trip={trip} key={k} />);

  return (
    <div className='ShowTripList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Trips List</h2>
          </div>

          <div className='col-md-11'>
            <Link
              to='/create-trip'
              className='btn btn-outline-warning float-right'
            >
              + Add New Trip
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{tripList}</div>
      </div>
    </div>
  );
}

export default ShowTripList;