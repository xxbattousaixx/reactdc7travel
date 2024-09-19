import { Link } from 'react-router-dom';
import '../App.css';


const TripCard2 = (props) => {
  
  const trip = props.trip;
  const myprofile = props.myprofile;
  const img = 'http://34.207.167.146:3100/images/'+trip.fileName;
  const img2 = 'http://34.207.167.146:3100/images/'+myprofile[0]?.fileName;


  return (

    <div className='container2'>
      
        <div className="bg">
      </div>
      <div className="nft">
        <div className='main'>
        <Link to={`/show-trip/${trip._id}`}>
    
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
            <div className="price" style={{color:'white'}}>
              <ins>◘Value</ins>
              <p>{trip.value}</p>
            </div>
            <div className="duration" style={{color:'white'}}>
              <ins>◷Quality</ins>
              <p>{trip.quality}</p>
            </div>
          </div>
          <div className='creator row'>
            <div className='wrapper'>
              <img src={img2} width="45vw" alt="Creator" />
            </div>
            <Link className='ml-2' style={{fontSize:'12px'}} to={`/show-profileinfo/${trip.userid}`}>   Posted by: {trip.user}</Link>
            
          </div>
        </div>
      </div>
    
            
          
          </div>
  );
};

export default TripCard2;