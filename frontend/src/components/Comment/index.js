import './Comment.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../store/comments';
import { useParams } from 'react-router-dom';
import { fetch } from '../../store/csrf';



const Comment = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const photoComments = useSelector(state => state.comments.comments)
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);

  // console.log(photoComments);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/comment/${id}`)
      setComments(res.data.comments);
    })()
    return dispatch(commentActions.updatingState(id))
    .catch(res => {
      if (res.data && res.data.errors) setErrors(res.data.errors)
    })

  }, [dispatch, id, photoComments.length]);

  let body;
  if(photoComments.length > 0) {
    body = <div className='commentCont'>
        {comments.map((comment, i) => <div key={comment.id} >
            <div className='user'>{comment.User.firstName} {comment.User.lastName}:</div>
            <div className='comment'>{comment.comment}</div>
          </div>)}
      </div>
  } else {
    body = <div>No comments</div>
  }
  // console.log(comments);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!comment.length) {
      setErrors(['Comment field needs to have something to be submitteed']);
      return
    }
    dispatch(commentActions.addingComment({
      comment,
      userId: sessionUser.id,
      photoId: id
    }))
      .then(res => {
        dispatch(commentActions.gettingState())
        .then(res => {
          setComments(res.data.comments)
          setComment('');
        })
        return res
      })
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
      setComment('');
  }

  return (
    <>
      <h3 className='commentsH3'>Comments:</h3>
      <div className='mainCommentBox'>
        {body}
        {errors.map((error,i) => <div className='errors' key={i}>{error}</div>)}
        <textarea
          type='text'
          id='commentBox'
          placeholder='Enter a comment'
          onChange={e => setComment(e.target.value)}
          value={comment}
          required
        />
        <button type='submit' onClick={handleSubmit}>Comment</button>
      </div>
    </>
  )
}

export default Comment;
