import React from 'react';
import { NavLink } from 'react-router-dom';

const PhotoContainer = ({ props }) => {
  let name;
  if(props.firstName) {
    name = <h5>{props.firstName} {props.lastName}</h5>
  } else {
    name = <></>
  }
  return (
    <div className={props.className}>
      <NavLink to={`/photo/${props.id}`} className='imageLink' />
      <img src={props.thumbSrc} alt='' />
      {name}
    </div>
  )
}

export default PhotoContainer;
