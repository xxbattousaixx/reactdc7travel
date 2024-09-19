import { Link } from 'react-router-dom';
import '../App.css';
import { useState } from 'react';

import logo from '/src/img/dc7logo.png';
const TripCard = (props) => {
  
   const trip = props.trip;
  const inprofile = props.inprofile;
  const img = 'http://34.207.167.146:3100/images/'+trip.fileName;
  const img2 = 'http://34.207.167.146:3100/images/'+inprofile[0]?.fileName;



  // const img = 'http://localhost:3100/images/'+trip.fileName


  return (


    <div className='container2'>
      
    <div className="bg">
  </div>
  <div className="nft">
    <div className='main'>
    <Link to={`/show-tripinfo/${trip._id}`}>

          <img
            src={img}
            alt='travel pic'
            width='100%'
            height='200vh' />
        </Link>

     <div style={{color:'#CBB279'}}>To: {trip.location}</div>
      <hr/>
      <div className="pp">{trip.notes}

</div>
<hr />

      <div className='tokenInfo'>
        <div className="price">
          <ins>◘Value</ins>
          <p>{trip.value}</p>
        </div>
        <div className="duration">
          <ins>◷Quality</ins>
          <p>{trip.quality}</p>
        </div>
      </div>
      
      <div className='creator row'>
        <div className='wrapper' >
          <img  src={img2} width='45ww'  alt="Creator"  />
        </div>
        <Link className='ml-2'  style={{fontSize:'12px'}}  to={`/show-profileinfo/${trip.userid}`}>   Posted by: {trip.user}</Link>        
      </div>
    </div>
  </div>

        
      
      </div>
  );
};

export default TripCard;