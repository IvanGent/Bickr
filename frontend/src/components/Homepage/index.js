import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetch } from '../../store/csrf';
import Footer from '../Footer';
import './Homepage.css'

const Homepage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/photo')
        setPhotos(res.data.photos);
      } catch(e) {
        setErrors([e.message]);
      }
    })()
  },[])


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
      <div className='userMain'>
        <div>
          {errors.map((error, i) => <div key={i}>{error}</div> )}
        </div>
        <div className='gridContainer'>
          {/* <div className='photoContainer'> */}
            {photos.map((photo, i) => {
              const num = ['one', 'two', 'three', 'four', 'five', 'six', 'seven',
                'eight', 'nine', 'ten', 'eleven', 'tweleve', 'thirteen', 'fourteen',
                'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
              return <div key={photo.id} id={num[i]}><img src={photo.thumbSrc} alt='' /></div>
            })}
            {/* {body} */}
          {/* </div> */}
        </div>
      </div>
    );
  };

  return (
    <>
      {sessionBody}
    </>
  );

}

export default Homepage;
