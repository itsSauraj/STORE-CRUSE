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
	onAuthStateChanged,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	collection,
	query,
	where,
	getDocs,
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

const createUserProfileDocumentOrGetProfile = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = doc(db, "users", userAuth.uid);

	const snapShot = await getDoc(userRef);

	if (!snapShot.exists()) {
		const createdAt = new Date();
		let displayName = userAuth.displayName || additionalData.displayName;
		let email = userAuth.email || additionalData.email;
		let passwordSet = additionalData && (additionalData.password1) ? true : false;

		try {
			await setDoc(userRef, {
				displayName,
				email,
				createdAt,
				passwordSet,
				cart: [],
			});
			sendEmailVerification(userAuth);
		} catch (error) {
			return { error: error };
		}
	}

	return snapShot.data();
}

const CreateCustomUser = async (formData) => {
	try {
		await createUserWithEmailAndPassword(auth, formData.email, formData.password1);
	} catch (error) {
		return { error: error };
	}
}

const checkIfUserPasswordSet = async (userEmail) => {

	const userCollectionInstance = collection(db, "users");
	const userQuery = query(userCollectionInstance, where("email", "==", userEmail));

	const snapShot = await getDocs(userQuery);
	const users = snapShot.docs.map((doc) => doc.data());

	return users[0].passwordSet;

}

const sendPasswordResetEmailToUser = async (email) => {
	return sendPasswordResetEmail(auth, email);
}

const LogOutUser = async () => {
	return await signOut(auth);
}

const AuthStateChanged = (callback) => {
	return onAuthStateChanged(auth, callback);
}

export {
	auth,
	firebaseApp,
	firebaseAnalytics,
	signInWithGooglePopup,
	LogOutUser,
	signInWithEmailPassword,
	createUserProfileDocumentOrGetProfile,
	CreateCustomUser,
	checkIfUserPasswordSet,
	AuthStateChanged,
	sendPasswordResetEmailToUser,
	db,
}