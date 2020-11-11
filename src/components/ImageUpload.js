import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { storage, db } from '../firebase.js';
import firebase from 'firebase';
import './imageUpload.css'

function ImageUpload({ username }) {
  const[image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransfered / snapshot.totalBytes) * 100)
      setProgress(progress)
    }, (error) => {
      console.log(error);
    }, () => {
      storage.ref('images')
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        //post image in db
        db.collection('posts').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          caption: caption,
          imageUrl: url,
          username: username
        })
      })
      setProgress(0);
      setCaption('');
      setImage(null)
    })
  }

  return (
    <div className='imageUpload'>
      <progress className='imageUploadProgress' value={progress} max='100'></progress>
      <input type="text" placeholder='Enter a caption...' value={caption} onChange={e => setCaption(e.target.value)}/>
      <input type="file" onChange={ handleChange }/>
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
