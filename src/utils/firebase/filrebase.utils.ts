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
	UserCredential,
	updateProfile
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



type FirebaseConfig = {
	apiKey: string,
	authDomain: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	appId: string,
	measurementId: string,
}

const firebaseConfig: FirebaseConfig = {
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

const signInWithEmailPassword = (email: string, password: string): Promise<UserCredential> => {
	return signInWithEmailAndPassword(auth, email, password);
}

const db = getFirestore(firebaseApp);

type additionalData = {
	displayName: string,
	email: string,
	password1?: string,
}

const createUserProfileDocumentOrGetProfile = 
	async (userAuth: UserCredential['user'], additionalData: additionalData) => {
	if (!userAuth) return;

	const userRef = doc(db, "users", userAuth.uid);

	const snapShot = await getDoc(userRef);

	if (!snapShot.exists()) {
		const createdAt = new Date();
		let displayName: string = additionalData?.displayName;
		let email: string = additionalData?.email;
		let passwordSet = additionalData.password1 ? true : false;

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

type formData = {
	displayName: string,
	email: string,
	password1: string,
}

const CreateCustomUser = async (formData: formData) => {
	try{
		const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password1);
		await updateProfile(userCredential.user, {
			displayName: formData.displayName
		});
		return userCredential;
	} catch (error: any) {
		if (error.code == "auth/email-already-in-use"){
			return { error: "Email already in use" };
		}
		return {
			error: "Error creating user",
		}
	}
}

const checkIfUserPasswordSet = async (userEmail: string) => {

	const userCollectionInstance = collection(db, "users");
	const userQuery = query(userCollectionInstance, where("email", "==", userEmail));

	const snapShot = await getDocs(userQuery);
	const users = snapShot.docs.map((doc) => doc.data());

	return users[0].passwordSet;

}

const sendPasswordResetEmailToUser = async (email: string): Promise<void> => {
	return sendPasswordResetEmail(auth, email);
}

const LogOutUser = async (): Promise<void> => {
	return await signOut(auth);
}

const AuthStateChanged = (callback: any) => {
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