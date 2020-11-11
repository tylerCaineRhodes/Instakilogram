import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDFUZvn3o5nyUK13McU2R99huyNFs6SlZk',
  authDomain: 'instragram-clone-a5a98.firebaseapp.com',
  databaseURL: 'https://instragram-clone-a5a98.firebaseio.com',
  projectId: 'instragram-clone-a5a98',
  storageBucket: 'instragram-clone-a5a98.appspot.com',
  messagingSenderId: '248190329972',
  appId: '1:248190329972:web:e10b55536fddebe05c1d21',
  measurementId: 'G-7Y34X1E8BL',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
