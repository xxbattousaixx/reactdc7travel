import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TripCard2 from './TripCard2';
import * as https from "https";
import ReactPaginate from "react-paginate";
import { Amplify } from 'aws-amplify';
//2.
import awsExports from '../aws-exports';
//3.
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
//4.
Amplify.configure(awsExports)



const PER_PAGE = 3;
const url = "http://18.204.199.85:3100"
// let caCrt = '';
// try {
//     caCrt = fs.readFileSync('./ca.pem')
// } catch(err) {
//     console.log('Make sure that the CA cert file is named ca.pem', err);
// }
const httpsAgent = new https.Agent({ rejectUnauthorized: false, 
  ca: require('/src/ca.crt'),
  passphrase: "sayonara",
  keepAlive: false });



function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(true); 
  const [userInfo, setUserInfo] = useState("");

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    setUserInfo(user.attributes);
  }
  
  const handleChange = e => {
    setSearchField(e.target.value);
    if(e.target.value===""){
      setSearchShow(true);
    }
  };

  
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * PER_PAGE;
    
   
  
    console.log(trips);
    // getUserInfo().then(result=>
    //   setUserInfo(result) );
  
  
    // const tripList =
    //   trips.length === 0
    //     ? 'there is no trip record!'
    //     : trips.map((trip, k) => <TripCard trip={trip} key={k} />);
  
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
  
  

    
    useEffect(() => {
  //     const instance = axios.create(
  // { baseURL: url, 
  //   httpsAgent: httpsAgent,
  // headers: {
  //   'Access-Control-Allow-Origin' : '*',
  //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
  //   'Content-Type': 'multipart/form-data'
  // }  });
  getUserInfo();
  axios.get(url, {httpsAgent:httpsAgent})
        .then((res) => {
          setTrips(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log('Error from ShowTripList');
        });
    }, []);
    
    function searchList() {
      if (searchShow) {
        return (
        <div className='list'>
    
            {currentPageData}
            </div>
        );
      }
    }
   
    const currentPageData = trips.filter(
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
    )
    .slice(offset, offset + PER_PAGE)
    .map((trip, k) => <TripCard2 trip={trip} key={k} />);
 return(

    <Authenticator>

{({ signOut, user}) => (

  
        <div >

<div className='row'>

<div className='col-md-5'>
<Link
              to='/create-trip'
              className='btn btn-outline-warning float-left'
            >
              + Add New Trip
            </Link>
            
</div>
<br/>
<br/>
<br/>
<br/>
<div className='col-md-2'>  
<Link to='/' className='btn btn-outline-warning'>
              Show Travel List
            </Link>
           

</div>
<div className='col-md-5'>


<button className='btn btn-outline-warning float-right' onClick={signOut}>Sign out</button>

</div>
</div>
          <h1>Hello {user.attributes.email}</h1>
Edit trips here.
<br/>


<hr />
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search Trips" 
          onChange = {handleChange}
        />
            <hr />
           Your added trips:
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
 )
}

//6.
export default Dashboard
