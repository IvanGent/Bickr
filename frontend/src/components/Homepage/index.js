import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer';
import './Homepage.css'
// import './Navigation.css'

const Homepage = () => {
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    // (async() => {
    //   try{
    //     const res = await fetch('http://localhost:3000/api/photos')
    //     if(!res.ok) {
    //       throw new Error('something went wrong');
    //       return;
    //     }
    //     const data = res.json();
    //     console.log(data);
    //   } catch(e) {
    //     console.error(e);
    //   }
    // })()
  })

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
      <main>
      </main>
    );
  };

  return (
    <>
      {sessionBody}
    </>
  );

}

export default Homepage;
