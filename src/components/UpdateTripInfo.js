import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import * as https from "https";
import { Amplify } from 'aws-amplify';
//2.
import awsExports from '../aws-exports';
//3.
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

//4.
Amplify.configure(awsExports)

const url = "http://18.216.129.102:3100";
const httpsAgent = new https.Agent({ rejectUnauthorized: false, 
  ca: require('/src/ca.crt'),
  passphrase: "sayonara",
  keepAlive: false });

// import https from 'https';
// const fs = require('fs').promises;
// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false, // (NOTE: this will disable client verification)
//   cert: fs.readFileSync("./usercert.pem"),
//   key: fs.readFileSync("./key.pem"),
//   passphrase: "sayonara"
// })

function UpdateTripInfo(props) {
  const [trip, setTrip] = useState({
    location: '',
    date: '',
    quality: '',
    value: '',
    notes: '',
    departing: '',
    // photo:'',
    fileName:''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const instance = axios.create({
      baseURL: url,
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        'Content-Type': 'multipart/form-data'
    } });
      instance
      .get(`/${id}`, {httpsAgent:httpsAgent})
      .then((res) => {
        setTrip({
          location: res.data.location,
          date: res.data.date,
          notes: res.data.notes,
          quality: res.data.quality,
          value: res.data.value,
          departing: res.data.departing,
          // photo: res.data.files[0],
          fileName: res.data.files[0].fileName
        });
      })
      .catch((err) => {
        console.log('Error from UpdateTripInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };
 const handlePhoto = (e) => {
    setTrip({ ...trip, photo: e.target.files[0] });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      location: trip.location,
      date: trip.date,
      notes: trip.notes,
      quality: trip.quality,
      value: trip.value,
      departing: trip.departing,
      // photo: trip.photo,
      fileName: trip.photo.fileName
    };

    axios
      .put(`${url}/${id}`, data,  {httpsAgent:httpsAgent})
      .then((res) => {
        navigate(`/show-trip/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateTripInfo!');
      });
  };

  return (


    <Authenticator>
      {({ signOut, user }) => (
           <div className='UpdateTripInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Trips List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Trip</h1>
            <p className='lead text-center'>Update Trip's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form  onSubmit={onSubmit} encType='multipart/form-data'>
            <div className='form-group'>
              <label htmlFor='location'>Location</label>
              <input
                type='text'
                placeholder='Location of the Trip'
                name='location'
                className='form-control'
                value={trip.location}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='date'>Travel Date</label>
              <input
                type='date'
                placeholder='Date'
                name='date'
                className='form-control'
                value={trip.date}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='notes'>Notes</label>
              <input
                type='text'
                placeholder='Notes'
                name='notes'
                className='form-control'
                value={trip.notes}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='quality'>Quality</label>
              <textarea
                type='number'
                placeholder='Quality rating'
                name='quality'
                className='form-control'
                value={trip.quality}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='value'>Value rating</label>
              <input
                type='number'
                placeholder='Value rating'
                name='value'
                className='form-control'
                value={trip.value}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='departing'>Departing</label>
              <input
                type='text'
                placeholder='Departing city of the Trip'
                name='departing'
                className='form-control'
                value={trip.departing}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='departing'>Photo</label>
              <input
                type='file'
                placeholder='Picture'
                name='photo'
                className='form-control'
                onChange={handlePhoto}
              />
            </div>
            <br />


            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Trip
            </button>
          </form>
        </div>
      </div>
    </div>
      )}
    </Authenticator>
   
  );
}

export default UpdateTripInfo;