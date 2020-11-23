import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='sessionLinks'>
        <NavLink className='login' to="/login">Log In</NavLink>
        <NavLink className='signUp' to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <p className='firstBall'></p>
          <p className='secondBall'></p>
          <NavLink className='home' exact to="/">bickr</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
