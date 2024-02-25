import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TripCard2 from './TripCard2';
import ReactPaginate from "react-paginate";
//2.
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
//3.
//4.


import { Amplify } from 'aws-amplify';


import awsmobile from '../aws-exports';
//3.
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsmobile);


const PER_PAGE = 6;
const url = "http://35.171.2.96:3100/trips"
const url2 = "http://35.171.2.96:3100/profiles"

// const url = "http://localhost:3100/trips";
// const url2 = "http://localhost:3100/profiles";


// let caCrt = '';
// try {
//     caCrt = fs.readFileSync('./ca.pem')
// } catch(err) {
//     console.log('Make sure that the CA cert file is named ca.pem', err);
// }

async function getUserInfo() {
  const user = await Auth.currentAuthenticatedUser();
  setUserInfo(user.attributes);
}

function Dashboard(props) {

  const [trips, setTrips] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [userInfo, setUserInfo] = useState("");

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(true); 

  const [profile, setProfile] = useState({});

  
  const handleChange = e => {
    setSearchField(e.target.value);
    if(e.target.value===""){
      setSearchShow(true);
    }
  };


  
  
    // getUserInfo().then(result=>
    //   setUserInfo(result) );
  
  
    // const tripList =
    //   trips.length === 0
    //     ? 'there is no trip record!'
    //     : trips.map((trip, k) => <TripCard2 trip={trip} key={k} />);




    
    

 

        const pageCount = Math.ceil(trips.filter(
          trip => {
            return (
              trip.user.toLowerCase().includes(userInfo.email) &&
              (trip
              .location
              .toLowerCase()
              .includes(searchField.toLowerCase()) ||
              trip
              .departing
              .toLowerCase()
              .includes(searchField.toLowerCase()))
            );
          }
        ).length / PER_PAGE);  
    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
    }
  
    const instance = axios.create(
      { baseURL: url, 
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded'
      } 
    
    });
  
      const instance2 = axios.create(
        { baseURL: url2, 
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
          'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded'
        } 
      
      });

  //  async function getUserInfo() {
    
  //   setUserInfo(user.attributes);
  // }
  









  // setUserInfo(getCurrentUser());

  useEffect(() => {

  
    instance.get(url)
        .then((res) => {
getUserInfo();
          setTrips(res.data.reverse());
          // console.log(res);
        })
        .catch((err) => {
          console.log('Error from ShowTripList');
        });
      }, []);


        instance2.get(url2)
        .then((res) => {
    
        setProfiles(res.data);

            for(var i = 0; i < res.data.length; i++)
      {
      if(res.data[i].username === userInfo.email)
      {
      setProfile(res.data[i]);
      }
    
      };
      
        })
        .catch((err) => {
          console.log('Error from ShowProfileList');
        });
  
  
  

  
  
    
    function searchList() {
      if (searchShow) {
        return (
        <div className='list'>
    
            {currentPageData}
            </div>
        );
      }
    }
  
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  




    const currentPageData = trips.filter(
      trip => {
       
        
        
        return (
          trip.user.toLowerCase().includes(profile.username) &&
          (trip
          .location
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
          trip
          .departing
          .toLowerCase()
          .includes(searchField.toLowerCase())
          
          )
        );
      }
    )
    .slice(offset, offset + PER_PAGE)
    .map((trip, k) => 
    
    <TripCard2 profile={profiles.filter( profile => {
            return (
              profile.username.includes(trip.user)
        );
    })
  } trip={trip} key={k} />);
  
 return(
  <Authenticator>
  {({ signOut, user }) => (


        <div >

<div className='row'>

<div className='col-md-5'>
<Link
              to='/create-trip'
              className='btn btn-outline-warning center'
            >
              + Add New Trip
            </Link>
            
</div>
<div className='col-md-4'>  
<Link to='/' className='btn btn-outline-warning'>
              Show Travel List
            </Link>
           

</div>
<div className='col-md-3'>
{profile._id 

?

<Link to={`/show-profile/${profile._id}`} className='btn btn-outline-warning float-left'>
              Profile
            </Link>
            
            :
            
            <Link to={`/create-profile`} className='btn btn-outline-warning float-left'>
              Profile
            </Link>}

<button className='btn btn-outline-warning float-right' onClick={signOut}>Sign out</button>


    

</div>
</div>

<hr/>
<div className='row'>
<div className='col-md-8'>
        <h2 style={{color:'grey', fontsize:'3rem'}}><b>Hello, {profile.username}</b></h2></div>
        <div className='col-md-4'>
            <input 
          className="pa3 bb btn1 br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search Trips" 
          onChange = {handleChange}
        />
</div></div>

      
            <hr />
           <b>Edit added trips by clicking their picture:</b>
<br/>
        {searchList()}
        <div></div>
        <hr />

        <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />


            <hr />





        </div>
      
    )}
    </Authenticator>
     
    );
  }
  
  export default Dashboard;