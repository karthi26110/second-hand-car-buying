import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRFnOY4hOYmdAxXxoOV2ZELYHbQeKCHa0",
  authDomain: "secondhand-cars-app.firebaseapp.com",
  projectId: "secondhand-cars-app",
  storageBucket: "secondhand-cars-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "AIzaSyDCUKsX0jmzseA9UZTIUloiREUa4pEWyAk"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

