import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import Dashboard from './Dashboard';

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
  cert: require('/src/ca.crt'),
  keys:require('/src/ca.crt'),
  passphrase: "sayonara",
  keepAlive: false });


function ShowTripDetails(props) {
  
  const [trip, setTrip] = useState({});
  const img = 'http://18.216.129.102:3100/images/'+trip.fileName
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/${id}`, {httpsAgent:httpsAgent})
      .then((res) => {
        setTrip(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowTripDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`${url}/${id}`, {httpsAgent:httpsAgent})
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowTripDetails_deleteClick');
      });
  };

  const TripItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Location</td>
            <td>{trip.location}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Date</td>
            <td>{trip.date}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Notes</td>
            <td>{trip.notes}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Quality rating</td>
            <td>{trip.quality}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Value rating</td>
            <td>{trip.value}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Departing from</td>
            <td>{trip.departing}</td>
          </tr>
          <tr>
            <th scope='row'>7</th>
            <td>Photo</td>
            <td> <img
        src={img}
        alt='travel pic'
        width={300}
        height={250}
      /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <Authenticator>
    <div className='ShowTripDetails'>
      <div className='container'>
      <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>DC7 TRAVEL BLOG</h2>
          </div>
        <br/>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Trip List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Trip's Record</h1>
            <p className='lead text-center'>View Trip's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{TripItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(trip._id);
              }}
            >
              Delete Trip
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-trip/${trip._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Trip
            </Link>
          </div>
        </div>
      <br/>
      <br/>
      </div>
    </div></Authenticator>
  );
}

export default ShowTripDetails;