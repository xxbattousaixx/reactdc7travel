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

import { Auth } from 'aws-amplify';
//4.
Amplify.configure(awsExports)

const url = "http://18.204.199.85:3100";
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

const UpdateTripInfo = (props) => {
  const [userInfo, setUserInfo] = useState("");

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    setUserInfo(user.attributes);
  }
  const [trip, setTrip] = useState({
    location: '',
    user:'',
    date: '',
    quality: '',
    value: '',
    notes: '',
    departing: '',
    photo:'',
    fileName:''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    getUserInfo();

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
          user: res.data.user,
          date: res.data.date,
          notes: res.data.notes,
          quality: res.data.quality,
          value: res.data.value,
          departing: res.data.departing,
          photo: res.data.photo,
          fileName: res.file.filename
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

console.log(trip);


  };
  const onSubmit = (e) => {
    e.preventDefault();
  const formData = new FormData();
  formData.append('location',trip.location);
  formData.append('user',userInfo.email);
  formData.append('date',trip.date);
  formData.append('notes',trip.notes);
  formData.append('quality',trip.quality);
  formData.append('value',trip.value);
  formData.append('departing',trip.departing);
  formData.append('photo',trip.photo);
  formData.append('fileName',trip.fileName);

  
    console.log(formData);

    axios
      .put(`${url}/${id}`, formData,  {httpsAgent:httpsAgent})
      .then((res) => {
        setTrip({
          location: '',
          user: '',
          date: '',
          notes: '',
          quality: '',
          value: '',
          photo:'',
          departing:'',
          fileName:''
               });
        navigate(`/show-trip/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateTripInfo!');
      });
  };

  return (


    <Authenticator>
      {({ signOut, user }) => (
           <div className='UpdateTripInfo' style={{
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
                defaultValue={trip.photo}
                  accept='.png, .jpg, .jpeg'
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