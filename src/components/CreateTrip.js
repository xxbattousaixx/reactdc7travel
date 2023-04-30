import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
// import https from 'https';
// const fs = require('fs').promises;
// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false, // (NOTE: this will disable client verification)
//   cert: fs.readFileSync("./usercert.pem"),
//   key: fs.readFileSync("./key.pem"),
//   passphrase: "sayonara"
// })

const CreateTrip = (props) => {
  const navigate = useNavigate();
  // Define the state with useState hook
  const [trip, setTrip] = useState({
    location: '',
    date: '',
    notes: '',
    quality: '',
    value: '',
    departing: '',
  photo:''  });

  const onChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    setTrip({ ...trip, photo: e.target.files[0] });
console.log(trip.photo);

  };

  const onSubmit = (e) => {
    e.preventDefault();
  const formData = new FormData();
  formData.append('location',trip.location);
  formData.append('date',trip.date);
  formData.append('notes',trip.notes);
  formData.append('quality',trip.quality);
  formData.append('value',trip.value);
  formData.append('departing',trip.departing);
  formData.append('photo',trip.photo);
  console.log(trip.photo);

  const instance = axios.create(
    {  baseURL: "/",
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      'Content-Type': 'multipart/form-data'
  } });
    instance.post('/', formData)
      .then((res) => {
        setTrip({
          location: '',
          date: '',
          notes: '',
          quality: '',
          value: '',
          photo:''
               });

          // Push to /
          navigate('/');
        })
        .catch((err) => {
          console.log('Error in CreateBook!');
        });
  }
  return (
    <div className='CreateTrip'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Travel List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Travel</h1>
            <p className='lead text-center'>Create new trip</p>

            <form noValidate onSubmit={onSubmit} encType='multipart/form-data'>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Location of travel'
                  name='location'
                  className='form-control'
                  value={trip.location}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='Date of travel'
                  name='date'
                  className='form-control'
                  value={trip.date}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Notes'
                  name='notes'
                  className='form-control'
                  value={trip.notes}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Quality rating'
                  name='quality'
                  className='form-control'
                  value={trip.quality}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Value rating'
                  name='value'
                  className='form-control'
                  value={trip.value}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Departing from'
                  name='departing'
                  className='form-control'
                  value={trip.departing}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  name='photo'
                  className='form-control'
                  onChange={handlePhoto}
                />
              </div>

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};
export default CreateTrip;