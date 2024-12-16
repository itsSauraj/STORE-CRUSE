import { 
	collection, 
	getDocs, 
	getDoc,
	doc,
	setDoc 
} from "firebase/firestore";
import { db } from "./filrebase.utils";

const fetchAllProducts = async () => {
	try {
		const productsCollectionRef = collection(db, "products");
		const querySnapshot = await getDocs(productsCollectionRef);
		const products = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		return products;
	} catch (error) {
		return error;
	}
};


const updateUserCart = async (user, cart) => {
	if (cart === undefined) {
		return;
	}
	const userRef = doc(db, "users", user.uid);
	try {
		await setDoc(userRef, { cart }, { merge: true });
	} catch (error) {
		console.error("Error updating user cart: ", error);
	}
}

const fecthUserCart = async (user) => {
	const userRef = doc(db, "users", user.uid);
	const snapShot = await getDoc(userRef);
	return snapShot.data().cart;
}


export { 
	fetchAllProducts,
	updateUserCart,
	fecthUserCart,
};
