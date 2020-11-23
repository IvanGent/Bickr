import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer';
import './Homepage.css'

const Homepage = () => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionBody;
  if(!sessionUser) {
    sessionBody = (
      <div className='homepage'>
        <h1>Find your inspiration.</h1>
        <h2>Join the Bickr community, home to a few photos</h2>
        <NavLink to='/signup'>Start for free</NavLink>
        <Footer />
      </div>
    );
  } else {
    sessionBody = (
      <></>
    );
  };

  return (
    <>
      {sessionBody}
    </>
  );

}

export default Homepage;
