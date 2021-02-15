import { fetch } from './csrf';

const ADD_PHOTO = 'photo/addPhoto';
const UPDATE_STATE = 'photo/updateState';
const GET_STATE = 'photo/getState';
const DELETE_PHOTO = 'photo/deletePhoto'

const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    payload: photo,
  };
};

const updateState = (photos) => {
  return {
    type: UPDATE_STATE,
    payload: photos
  }
}

const getState = () => {
  return {
    type: GET_STATE,
  }
}

const deletePhoto = () => {
  return {
    type: DELETE_PHOTO,
  }
}

export const gettingState = () => (dispatch) => {
  dispatch(getState());
  return
}

export const addPhotoToProfile = (photo) => async (dispatch) => {
  const { userId, thumbSrc, src } = photo;
  const res = await fetch('/api/photo', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      thumbSrc,
      src
    })
  });
  await dispatch(addPhoto(res.data.photo));
  return res;
}


export const updatingState = (userId) => async (dispatch) => {
  const res = await fetch(`/api/profile/photos/${userId}`)
  if (res) {
    dispatch(updateState(res.data.photos))
    return res;
  }
}

export const deleteAPhoto = ({id, userId}) => async (dispatch) => {
  const res = await fetch(`/api/photo/${id}`, {
    method: 'DELETE'
  })
  dispatch(deletePhoto())
  return res;
}


let initialState = {photos: [] }

const photoReducer = (state = initialState, {type, payload}) => {
  let newState;
  switch(type) {
    case ADD_PHOTO:
      newState = { photos: [...state.photos, payload]}
      return newState;
    case UPDATE_STATE:
      newState = { photos: [...payload] }
      return newState;
    case GET_STATE:
      return state;
    case DELETE_PHOTO:
      newState = { photos: [] };
      return newState;
    default:
      return state;
  };
};

export default photoReducer;
