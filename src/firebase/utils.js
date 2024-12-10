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

import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
} from "firebase/firestore";
import { form } from "motion/react-client";


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

providerPopUp.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(firebseApp);

const signInWithGooglePopup = () => signInWithPopup(auth, providerPopUp);

const signInWithEmailPassword = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
}

const db = getFirestore(firebseApp);

const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = doc(db, "users", userAuth.uid);

	const snapShot = await getDoc(userRef);

	if (!snapShot.exists()) {
		const createdAt = new Date();
		const { displayName, email } = additionalData;

		try {
			await setDoc(userRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("Error creating user", error.message);
		}
	}

	return userRef;
}

const CreateCustomUser = async (formData) => {
	try {
		const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password1);
		createUserProfileDocument(user, formData);
		const mail = await sendEmailVerification(user);

		return user;
	} catch (error) {
		console.log("Error creating user", error.message);
	}
}

export {
	firebseApp,
	firebaseAnalytics,
	signInWithGooglePopup,
	signOut,
	signInWithEmailPassword,
	createUserProfileDocument,
	CreateCustomUser
}