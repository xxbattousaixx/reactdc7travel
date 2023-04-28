import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const TripCard = (props) => {
  
  const trip = props.trip;
  const img = 'http://3.137.136.231:3100/images/'+trip.fileName

  return (
    <div className='card-container'>
      <img
        src={img}
        alt='travel pic'
        width={300}
        height={250}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-trip/${trip._id}`}>{trip.location}</Link>
        </h2>
        <h3>{trip.date}</h3>
        <p>{trip.quality}</p>
        <p>{trip.notes}</p>

      </div>
    </div>
  );
};

export default TripCard;