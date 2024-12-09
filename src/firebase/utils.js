import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
} from "firebase/auth";


const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKEY,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MEASSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_MEASSUREMENT_ID,
};

const firebseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebseApp);

const providerPopUp = new GoogleAuthProvider();
const providerEmailAndPassword = new GoogleAuthProvider();

providerPopUp.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(firebseApp);

const signInWithGooglePopup = () => signInWithPopup(auth, providerPopUp);

const signInWithEmailpassword = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
}


export {
	firebseApp,
	firebaseAnalytics
}