import { useState } from 'react';
import * as photoActions from '../../store/photos';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router-dom'
import './ProfilePage.css'


const ProfilePage = () => {
  const dispath = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);

  console.log(sessionUser);
  // if(sessionUser) return (
  //   <Redirect to='/' />
  // )

  const handlePhoto = (e) => {
    const reader = new FileReader();
    setErrors([]);
    reader.addEventListener('load', async () => {
      return dispath(photoActions.addPhotoToProfile({id: sessionUser.id, photoData: reader.result}))
        .catch(res => {
          if(res.data && res.data.errors) setErrors(res.data.errors);
        })
    })
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className='profile'>
      <input type='file' id='newPhoto' onChange={handlePhoto} />
      <div>
        {errors.map(error => <>{error}</>)}
      </div>
    </div>
  )
}

export default ProfilePage;
