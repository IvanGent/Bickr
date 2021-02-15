import { useEffect, useState } from 'react';
import * as photoActions from '../../store/photos';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { fetch } from '../../store/csrf';
import Album from '../Album'
import Footer from '../Footer'
import './ProfilePage.css'



const ProfilePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userPhotos = useSelector(state => state.photo.photos);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  const [showAlbumCreate, setShowAlbumCreate] = useState(false);
  const [showingAlbum, setShowingAlbum] = useState(false);


  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/profile/${id}`)
      setUser(res.data.user)
      await fetch(`/api/album/user/${id}`)
    })()
    return dispatch(photoActions.updatingState(id))
      .catch(res => {
        if(res.data && res.data.errors) setErrors(res.data.errors)
      })

  },[dispatch, id, userPhotos.length]);


  const handlePhoto = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if(!file.type.match(/image.*/)) {
      setErrors(['Needs to be an image']);
      return;
    }

    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result

      img.onload = async function(event) {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / event.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = event.target.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(event.target, 'image/jpeg');
        return dispatch(photoActions.addPhotoToProfile({ userId: id, thumbSrc: srcEncoded, src: e.target.result}))
        .then(res => dispatchEvent(photoActions.gettingState()))
        .catch(res => {
          if(res.data && res.data.errors) setErrors(res.data.errors);
        })
      }
    }
    reader.readAsDataURL(file);
  }

  let place;
  if(userPhotos.length > 0) {
    place = <div className='photosContainer'>
      {userPhotos.map(photo => {
        return <div key={photo.id} className='imageContainer'>
          <NavLink to={`/photo/${photo.id}`} className='imageLink' />
          <img id={photo.id} src={photo.thumbSrc} alt='' />
        </div>
    }
  )}
    </div>
  } else {
    place = <h1>Photos will show here</h1>
  }

  let addPhoto;
  if(Number(id) === sessionUser.id) {
    addPhoto = <div className='imageHeader'>
        <p>Want to add a photo?</p>
        <label className='uploadField'>
          <input type='file' id='newPhoto' onChange={handlePhoto} accept='.jpg, .jpeg, .png'  />
          Select a file to upload
        </label>
      </div>
  } else {
    addPhoto = <></>;
  }

  const handleOpenCreateAlbum = () => {
    setShowAlbum(false);
    setShowAlbumCreate(true);
  };

  const handleShowAlbums = () => {
    setShowingAlbum(false);
    setShowAlbum(true);
    setShowAlbumCreate(true);
  }

  const handleShowPhotos = () => {
    setShowAlbum(false);
    setShowAlbumCreate(false);
  }

  return (
    <div className='profile'>
      <div className='secondHeader'>
        <div className='userContent'>
          <h3>{user.firstName} {user.lastName}</h3>
          <h4>{user.email}</h4>
        </div>
      </div>
      <div className='tabs'>
        <div onClick={handleOpenCreateAlbum}>Create An Album</div>
        <div onClick={handleShowAlbums}>Albums</div>
        <div onClick={handleShowPhotos}>Photos</div>
      </div>
      {addPhoto}
      <div>
        {errors.map((error, i) => <div key={error.id}>{error}</div>)}
      </div>
      <div className='mainPhotos'>
        {showAlbumCreate ? (
          <Album 
            setShowAlbum={setShowAlbum} 
            showAlbum={showAlbum}
            showingAlbum={showingAlbum}
            setShowingAlbum={setShowingAlbum}
            />
        ) : (
          <>
          {place}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage;
