import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {Card} from 'reactstrap';

const TripCard2 = (props) => {
  
  const trip = props.trip;
  const img = 'http://18.204.199.85:3100/images/'+trip.fileName
  // const img = 'http://localhost:3100/images/'+trip.fileName


  return (
    <div className='card-container'>

    <Card>

    <Link to={`/show-trip/${trip._id}`}>

    <img
      src={img}
      alt='travel pic'
      width='100%'
      height='100%'
    />

</Link>

    <div className='desc'>
      
          <h3>To: {trip.location}</h3>
  <div className="p2"><b> Departing from: {trip.departing}</b></div>

      {trip.date}

{/* <div className='p3'>
  <Link to={`/edit-trip/${trip._id}`}>
    </Link></div> */}
   <p>{trip.notes}
   
   </p>
   <div className="p2"> 
| Value:    <b>{trip.value}</b>   |   | Quality:    <b>{trip.quality} </b>|

</div>

    </div>

    </Card>
    
  </div>
  );
};

export default TripCard2;