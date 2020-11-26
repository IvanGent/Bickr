import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as photoActions from '../../store/photos';
import { fetch } from '../../store/csrf';
// import { Redirect } from 'react-router';
import './Picture.css'

const Picture = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const userId = sessionUser.id;
  const { id } = useParams();
  const [photo, setPhoto] = useState();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/photo/${id}`)
        setPhoto(res.data.photo);
      } catch(e) {
        setErrors([e.message])
      }
    })()
    //
  }, [id])
  console.log(photo)
  const handleDelete = () => {
    dispatch(photoActions.deleteAPhoto({id, userId}))
      .catch(res => {
        if(res.data && res.data.errors) setErrors(res.data.errors)
      })
    history.goBack();
  }



  let body;
  if(!photo) {
    body = <div className='loading'>Loading...</div>
  } else {
    if(photo) {
      let btn;
      if(photo.userId === userId) {
         btn = <button className='deleteBtn' onClick={handleDelete}>Delete</button>
      }
      body = (
        <div>
          <p onClick={e => history.goBack()}>Go back</p>
          <img src={photo.src} alt='' />
          {btn}
          {/* <button className='deleteBtn' onClick={handleDelete}>Delete</button> */}
        </div>
      )
    }
  }
  return (
    <div className='photoMain'>
      <div className='photoContainer'>
        {body}
      </div>
    </div>
  )
}

export default Picture;
