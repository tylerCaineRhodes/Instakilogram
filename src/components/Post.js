import React, { useState, useEffect } from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';
import { db } from '../firebase';

function Post({ user, postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const[comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if(postId) {
      unsubscribe = db.collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()))
      })
    }
    return unsubscribe;
  }, [postId])

  const postComment = (e) => {
    e.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('');
  }

  return (
    <div className='post'>
      <div className='postHeader'>
      <Avatar className='postAvatar' alt={username} src='' >
        {username.substring(0, 1)}
      </Avatar>

        <h3>{username}</h3>
      </div>

      <img className='postImage' src={imageUrl} alt='randomly generated' />

      <h4 className='postText'>
        <strong>{username}</strong> {caption}
      </h4>

      <div className='postComments'>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className='postCommentBox'>
          <input
            className='postInput'
            type='text'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='postButton'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            comment
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
