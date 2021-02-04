import { fetch } from './csrf';

const ADD_PHOTO = 'album/addPhoto';
const DELETE_PHOTO = 'album/deletePhoto';

const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        payload: photo
    }
}

const deletePhoto = (photo) => {
    return {
        type: DELETE_PHOTO,
        payload: photo
    }
}

const addingPhoto = (data) => async(dispatch) => {
    const { userId, photoId, albumId } = data;
    const res = await fetch(`/api/album/`)
}

let initialState = { album: [] };

const albumReducer = (state = initialState, { type, payload}) => {
    let newState;
    switch(type) {
        case ADD_PHOTO:
            newState = { album: [...state.album, payload]}
            return newState;
        default:
            return state;
    }
}

export default albumReducer;