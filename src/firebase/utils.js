import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
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


const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKEY,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MEASSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_MEASSUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);

const providerPopUp = new GoogleAuthProvider();

providerPopUp.setCustomParameters({ prompt: "select_account" });

const auth = getAuth(firebaseApp);

const signInWithGooglePopup = () => signInWithPopup(auth, providerPopUp);

const signInWithEmailPassword = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
}

const db = getFirestore(firebaseApp);

const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = doc(db, "users", userAuth.uid);

	const snapShot = await getDoc(userRef);

	if (!snapShot.exists()) {
		const createdAt = new Date();
		let displayName = userAuth.displayName || additionalData.displayName;
		let email = userAuth.email || additionalData.email;

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
		return { error: error };
	}
}

const LogOutUser = () => {
	return signOut(auth);
}

export {
	auth,
	firebaseApp,
	firebaseAnalytics,
	signInWithGooglePopup,
	LogOutUser,
	signInWithEmailPassword,
	createUserProfileDocument,
	CreateCustomUser
}