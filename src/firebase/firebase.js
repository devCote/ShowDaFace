import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKETKEY,
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

const storageRef = storage.ref();
export const imagesRef = storageRef.child('images');
export default firebase;
