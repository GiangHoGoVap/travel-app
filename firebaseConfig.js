// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcP68PeDgCSwbi0ph8mY2YyvRSPOgsPIo',
  authDomain: 'deliveroo-app.firebaseapp.com',
  projectId: 'deliveroo-app',
  storageBucket: 'deliveroo-app.appspot.com',
  messagingSenderId: '1087802614906',
  appId: '1:1087802614906:web:99ca9749fada9c142a47c3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
