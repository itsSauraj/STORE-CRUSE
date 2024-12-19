import { 
	collection, 
	getDocs, 
	getDoc,
	doc,
	setDoc,
} from "firebase/firestore";
import { db } from "./filrebase.utils";

import { CartInterface, ProductInterface } from './../../types/shop.interface';
import { User } from "firebase/auth";

const fetchAllProducts = async (): Promise<ProductInterface[]> => {
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


const updateUserCart = async (user: User, cart: CartInterface[]) => {
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

const fecthUserCart = async<T extends User>(user: User):  Promise<CartInterface[]> => {
	const userRef = doc(db, "users", user.uid);
	try{
		const snapShot = await getDoc(userRef);
		const data = snapShot.data();
		if (data) {
			return data.cart;
		} else {
			return [];
		}
	} catch (error) {
		console.error("Error fetching user cart: ", error);
		return [];
	}
}


export { 
	fetchAllProducts,
	updateUserCart,
	fecthUserCart,
};
