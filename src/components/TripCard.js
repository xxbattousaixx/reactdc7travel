import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const TripCard = (props) => {
  
  const trip = props.trip;
  const img = 'http://18.216.129.102:3100/images/'+trip.fileName

  return (
    <div className='card-container'>
      <br/>
      <img
        src={img}
        alt='travel pic'
        width={300}
        height={250}
      />
      <div className='desc'>
        
          <Link to={`/show-trip/${trip._id}`}><h2>{trip.location}</h2></Link>
        <h3>{trip.date}</h3>

    <Link to={`/edit-trip/${trip._id}`}><u>| Value:    <b>{trip.value}</b>   |   | Quality:    <b>{trip.quality} |</b></u></Link>
    <div className="p2"> Departing from: {trip.departing}</div>
     <p>{trip.notes}</p>





      </div>
    </div>
  );
};

export default TripCard;