import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDPbxg9VULK50ioLjNEyP90Y9jtN49jdR0',
  authDomain: 'blogapp-38c33.firebaseapp.com',
  projectId: 'blogapp-38c33',
  storageBucket: 'blogapp-38c33.appspot.com',
  messagingSenderId: '119592776062',
  appId: '1:119592776062:web:ca62e5b99f7ef91326032f',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestap = firebase.firestore.FieldValue.serverTimestamp;

export default firebaseApp.firestore(); 
export { timestap };
