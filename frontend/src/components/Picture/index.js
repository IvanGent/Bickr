import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import * as photoActions from '../../store/photos';
import { fetch } from '../../store/csrf';
import Comment from '../Comment';
import './Picture.css'
import Footer from '../Footer';

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

  const handleDelete = () => {
    dispatch(photoActions.deleteAPhoto({id, userId}))
      .catch(res => {
        if(res.data && res.data.errors) setErrors(res.data.errors)
      })
    history.replace(`/profile/${sessionUser.id}`);
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
          <div className='userName'>
            <NavLink to={`/profile/${photo.User.id}`}>{photo.User.firstName} {photo.User.lastName}</NavLink>
          </div>
          {btn}
          <div className='commentsContainer'>
            <Comment props={{comments:photo.comments}} />
          </div>
        </div>
      )
    }
  }
  return (
    <>
    <div className='filler'></div>
    <div className='photoMain'>

      <div className='photoContainer'>
        {body}
      </div>
    </div>
    </>
  )
}

export default Picture;
