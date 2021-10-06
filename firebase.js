import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQCeTsOztoj-WfepHM-8DpwwKtMaH4DJM",
  authDomain: "test-2382e.firebaseapp.com",
  projectId: "test-2382e",
  storageBucket: "test-2382e.appspot.com",
  messagingSenderId: "825965409406",
  appId: "1:825965409406:web:8ce49fdf5bd5406788542f",
  measurementId: "G-N3QGVL796E",
};

try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.log(err);
  }

export default firebase;
