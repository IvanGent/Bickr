import React from 'react';
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
        <a href='/signup'>Start for free</a>
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
