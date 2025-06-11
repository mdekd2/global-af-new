import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyCfHIAQ7ZpeFV_Ff92eHT_VemOgvs18Awc",
  authDomain: "gafs-e-commerce.firebaseapp.com",
  projectId: "gafs-e-commerce",
  storageBucket: "gafs-e-commerce.firebasestorage.app",
  messagingSenderId: "1023430294717",
  appId: "1:1023430294717:web:1936a49274f89b79cf4bd4",
  measurementId: "G-061F9340T2"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics }; 