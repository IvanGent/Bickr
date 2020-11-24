import { fetch } from './csrf';

const ADD_PHOTO = 'photo/addPhoto';

const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    payload: photo,
  };
};

export const addPhotoToProfile = (photo) => async (dispatch) => {
  const { id, photoData } = photo;
  const res = await fetch('/api/photo', {
    method: 'POST',
    body: JSON.stringify({
      id,
      photoData
    })
  });
  dispatch(addPhoto(res.data.photo));
  return res;
}

const initialState = { photos: [] };

const photoReducer = (state = initialState, {type, payload}) => {
  let newState;
  switch(type) {
    case ADD_PHOTO:
      newState = {...state, payload}
      return newState;
    default:
      return state;
  };
};

export default photoReducer;
