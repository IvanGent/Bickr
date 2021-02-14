import { fetch } from './csrf';

const UPDATE_ALBUM = 'album/updateAlbum';
const ADD_PHOTO = 'album/addPhoto';
const DELETE_PHOTO = 'album/deletePhoto';

const updateAlbum = (album) => {
    return {
        type: UPDATE_ALBUM,
        payload: album
    }
}

const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        payload: photo
    }
}

const deletePhoto = () => {
    return {
        type: DELETE_PHOTO,
    }
}

export const updatingAlbum = (data) => async(dispatch) => {
    const { id } = data;
    const res = await fetch(`/api/album/user/${id}`)
    await dispatch(updateAlbum(res.data.albums))
    // console.log(res);
    return res;
}

export const addingPhoto = (data) => async(dispatch) => {
    const { photos, albumId } = data;
    const res = await fetch(`/api/album/photo`, {
        method: 'POST',
        body: JSON.stringify({
            photos,
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
    await dispatch(deletePhoto())
    return res
}

let initialState = { album: [] };

const albumReducer = (state = initialState, { type, payload }) => {
    let newState;
    switch(type) {
        case UPDATE_ALBUM:
            newState = { album: [payload]};
            return newState;
        case ADD_PHOTO:
            newState = { album: [...state.album, payload]}
            return newState;
        case DELETE_PHOTO:
            // let arr = state.filter((ele, i) => i !== payload)
            // newState = { album: arr}
            return newState;
        default:
            return state;
    }
}

export default albumReducer;