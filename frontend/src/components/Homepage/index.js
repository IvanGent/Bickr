import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetch } from '../../store/csrf';
import Footer from '../Footer';
import './Homepage.css'
import PhotoContainer from '../PhotoContainer';

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
        <h2>Join the Bickr community, home to just a few photos</h2>
        <NavLink to='/signup'>Start for free</NavLink>
        <Footer />
      </div>
    );
  } else {
    sessionBody = (
      <div className='userMain'>
        <div className='fillerHome'></div>
        <div>
          {errors.map((error, i) => <div key={i}>{error}</div> )}
        </div>
        <div className='gridContainer'>

          <div className='imageContainerOne'>
            <h2>Recent Photos</h2>
            {photos.slice(0,4).map((photo) => {
              return <PhotoContainer key={photo.id} props={{
                className: 'photoCont',
                id: photo.id,
                thumbSrc: photo.thumbSrc,
                firstName: photo.User.firstName,
                lastName: photo.User.lastName}} />
            })}
          </div>
          <div className='imageContainerTwo'>
            <h2>Popular Photos</h2>
            <div className='firstTop'>
              {photos.slice(4,8).map((photo) => {
                return <PhotoContainer key={photo.id} props={{
                  className: 'rightTop',
                  id: photo.id,
                  thumbSrc: photo.thumbSrc
                }} />
              })}
            </div>
          </div>
          <div className='imageContainerThree'>
            <h2>Most Viewed</h2>
            <div className='middleTop'>
              {photos.slice(8,16).map((photo) => {
                return <PhotoContainer key={photo.id} props={{
                  className: 'rightTopTwo',
                  id: photo.id,
                  thumbSrc: photo.thumbSrc
                }} />
              })}
            </div>
          </div>
          <div className='imageContainerFour'>
            <h2>Photo of the day</h2>
            <div className='bottomTop'>
            {photos.slice(19).map(photo => {
              return <PhotoContainer key={photo.id} props={{
               className: 'rightBottom',
               id: photo.id,
               thumbSrc: photo.thumbSrc,
               firstName: photo.User.firstName,
               lastName: photo.User.lastName
             }} />
            })}
            </div>
          </div>
        </div>
        <Footer />
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
