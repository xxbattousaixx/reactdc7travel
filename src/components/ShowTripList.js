import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TripCard from './TripCard';
import * as https from "https";
import ReactPaginate from "react-paginate";
import { Amplify } from 'aws-amplify';
//2.
import awsExports from '../aws-exports';
//3.
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

//4.
Amplify.configure(awsExports)




const PER_PAGE = 3;
const url = "http://18.216.129.102:3100"
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
function ShowTripList() {

  const [trips, setTrips] = useState([]);
const [searchField, setSearchField] = useState("");

const [searchShow, setSearchShow] = useState(true); 

const handleChange = e => {
  setSearchField(e.target.value);
  if(e.target.value===""){
    setSearchShow(true);
  }
};
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
        trip
        .location
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        trip
        .departing
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  )
  .slice(offset, offset + PER_PAGE)
  .map((trip, k) => <TripCard trip={trip} key={k} />);
  useEffect(() => {
//     const instance = axios.create(
// { baseURL: url, 
//   httpsAgent: httpsAgent,
// headers: {
//   'Access-Control-Allow-Origin' : '*',
//   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
//   'Content-Type': 'multipart/form-data'
// }  });

axios.get(url, {httpsAgent:httpsAgent})
      .then((res) => {
        setTrips(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log('Error from ShowTripList');
      });
  }, []);


 

  



  const tripList =
    trips.length === 0
      ? 'there is no trip record!'
      : trips.map((trip, k) => <TripCard trip={trip} key={k} />);

      const pageCount = Math.ceil(trips.filter(
        trip => {
          return (
            trip
            .location
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            trip
            .departing
            .toLowerCase()
            .includes(searchField.toLowerCase())
          );
        }
      ).length / PER_PAGE);  
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }




  return (
<div>
<div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>DC7 TRAVEL BLOG</h2>
          </div>
<br/>
      
    <Authenticator>
    {({ signOut, user }) => (
    <div className='ShowTripList'>
      <div className='container'>
       
         <br/>
         <br/>
         <br/>


<div className='row'>

<div className='col-md-5'>
            <button className='btn btn-outline-warning float-left' onClick={signOut}>Sign out</button>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
<div className='col-md-2'> <Link
              to='/login'
              className='btn btn-outline-warning float-right'
            >
              My Trips
            </Link></div>
<div className='col-md-5'>


          <Link
              to='/create-trip'
              className='btn btn-outline-warning float-right'
            >
              + Add New Trip
            </Link>
</div></div>


            <hr />
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search Trips" 
          onChange = {handleChange}
        />
            <hr />

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
    </div>
  )}
</Authenticator></div>
  );
}

export default ShowTripList;