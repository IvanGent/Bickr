import { fetch } from './csrf';

const ADD_PHOTO = 'album/addPhoto';
const DELETE_PHOTO = 'album/deletePhoto';

const addPhoto = (photoId) => {
    return {
        type: ADD_PHOTO,
        payload: photoId
    }
}

const deletePhoto = (photoId) => {
    return {
        type: DELETE_PHOTO,
        payload: photoId
    }
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