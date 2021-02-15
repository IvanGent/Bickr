import { fetch } from './csrf';

const ADD_COMMENT = 'comment/addComment';
const UPDATE_STATE = 'comment/updateState';
const GET_STATE = 'comment/getState'

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  }
}

const updateState = (comments) => {
  return {
    type: UPDATE_STATE,
    payload: comments,
  }
}

const getState = () => {
  return {
    type: GET_STATE,
  }
}

export const addingComment = (com) => async(dispatch) => {
  const {userId, photoId, comment} = com;
  const res = await fetch(`/api/photo/${photoId}/comment`, {
    method: 'POST',
    body: JSON.stringify({
      comment,
      userId,
      photoId
    })
  })
  dispatch(addComment(res.data.comment));
  return res;
}

export const updatingState = (photoId) => async(dispatch) => {
  const res = await fetch(`/api/comment/${photoId}`);
  dispatch(updateState(res.data.comments))
  return res;
}

export const gettingState = () => (dispatch) => {
  dispatch(getState());
  return;
}

let initialState = { comments: [] };

const commentReducer = (state = initialState, { type, payload }) => {
  let newState;
  switch(type) {
    case ADD_COMMENT:
      newState = { comments: [...state.comments, payload]}
      return newState;
    case UPDATE_STATE:
      newState = { comments: [...payload] }
      return newState;
    case GET_STATE:
      return state;
    default:
      return state
  }
}

export default commentReducer;
