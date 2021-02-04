import { fetch } from './csrf';

const ADD_PHOTO = 'album/addPhoto';
const DELETE_PHOTO = 'album/deletePhoto';

const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        payload: photo
    }
}

const deletePhoto = (i) => {
    return {
        type: DELETE_PHOTO,
        payload: i
    }
}

export const addingPhoto = (data) => async(dispatch) => {
    const { photoId, albumId } = data;
    const res = await fetch(`/api/album/photo`, {
        method: 'POST',
        body: JSON.stringify({
            photoId,
            albumId
        })
    })
    await dispatch(addPhoto(res.data.photo))
    return res;
}

export const removingPhoto = (data) => async(dispatch) => {
    const { photoId, albumId } = data;
    const res = await fetch(`/api/album/photo`, {
        method: 'DELETE',
        body: JSON.stringify({
            photoId,
            albumId
        })
    })
    await dispatch(deletePhoto(res.data.photo))
    return res
}

let initialState = { album: [] };

const albumReducer = (state = initialState, { type, payload }) => {
    let newState;
    switch(type) {
        case ADD_PHOTO:
            newState = { album: [...state.album, payload]}
            return newState;
        case DELETE_PHOTO:
            let arr = state.filter((ele, i) => i !== payload)
            newState = { album: arr}
            return newState;
        default:
            return state;
    }
}

export default albumReducer;