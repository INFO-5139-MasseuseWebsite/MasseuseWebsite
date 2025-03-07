// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAAUoXOJwTxalpR6kuLNTZopTZFBch3iJs',
	authDomain: 'masseusewebsite.firebaseapp.com',
	projectId: 'masseusewebsite',
	storageBucket: 'masseusewebsite.firebasestorage.app',
	messagingSenderId: '422833011397',
	appId: '1:422833011397:web:37e1e7eec11bfb13ae8eac',
	measurementId: 'G-05DK1J89JY',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
