import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateTripInfo(props) {
  const [trip, setTrip] = useState({
    location: '',
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
    const instance = axios.create(
      {
              baseURL: "http://3.137.136.231:3100",
              withCredentials: false,
              headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',  
              'Content-Type': 'multipart/form-data'

            }
        });
      instance
      .get(`http://3.137.136.231:3100/${id}`)
      .then((res) => {
        setTrip({
          location: res.data.location,
          date: res.data.date,
          notes: res.data.notes,
          quality: res.data.quality,
          value: res.data.value,
          departing: res.data.departing,
          photo: res.data.files[0],
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
      fileName: trip.fileName
    };

    axios
      .put(`http://3.137.136.231:3100/${id}`, data)
      .then((res) => {
        navigate(`/show-trip/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateTripInfo!');
      });
  };

  return (
    <div className='UpdateTripInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show BooK List
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

            {/* <div className='form-group'>
              <label htmlFor='departing'>Photo</label>
              <input
                type='file'
                placeholder='Picture'
                name='photo'
                className='form-control'
                onChange={handlePhoto}
              />
            </div> */}
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
  );
}

export default UpdateTripInfo;