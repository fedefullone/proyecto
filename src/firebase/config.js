import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA26C2ES1Um6DK7iLb4sSFjzrNClrLnWJw",
    authDomain: "prog3-6fc9f.firebaseapp.com",
    projectId: "prog3-6fc9f",
    storageBucket: "prog3-6fc9f.appspot.com",
    messagingSenderId: "776321791733",
    appId: "1:776321791733:web:5705669a72e6485eabb7bc"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();