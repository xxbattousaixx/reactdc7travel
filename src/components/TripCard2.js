import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {Card} from 'reactstrap';
import logo from '/src/img/dc7logo.png';

const TripCard2 = (props) => {
  
  const trip = props.trip;
  const img = 'https://18.204.199.85:3100/images/'+trip.fileName
  // const img = 'http://localhost:3100/images/'+trip.fileName


  return (

    <div className='container2'>
      
        <div class="bg">
      </div>
      <div class="nft">
        <div class='main'>
        <Link to={`/show-trip/${trip._id}`}>
    
              <img
                src={img}
                alt='travel pic'
                width='100%'
                height='100%' />
            </Link>
    
         <div style={{color:'#CBB279'}}>To: {trip.location}</div>
          <hr/>
          <div className="pp">{trip.notes}
    
    </div>
    <hr />

          <div class='tokenInfo'>
            <div class="price">
              <ins>◘Value</ins>
              <p>{trip.value}</p>
            </div>
            <div class="duration">
              <ins>◷Quality</ins>
              <p>{trip.quality}</p>
            </div>
          </div>
          <div class='creator'>
            <div class='wrapper'>
              <img src={logo} alt="Creator" />
            </div>
            <Link to={`/show-profileinfo/${trip.userid}`}>   Posted by: {trip.user}</Link>

            
          </div>
    
        </div>
      </div>
    
            
          
          </div>
  );
};

export default TripCard2;