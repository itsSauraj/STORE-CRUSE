type Product = {
	title: string;
	price: number;
	image: string;
	description: string;
	category: string[];
}

const data: Product[] = [
	{
		title: "Women's Elegant Blouse",
		price: 200,
		image: "https://picsum.photos/id/1012/300/",
		description:
		"An elegant blouse perfect for both casual and formal occasions.",
		category: ["womens", "shirt"],
	},
	{
		title: "Unisex Cozy Hoodie",
		price: 300,
		image: "https://picsum.photos/id/1013/300/",
		description:
		"Stay warm and cozy with this stylish unisex hoodie, available in various sizes.",
		category: ["hoodie", "unisex"],
	},
	{
		title: "Trendy Baseball Cap",
		price: 400,
		image: "https://picsum.photos/id/1014/300/",
		description:
		"A trendy cap to elevate your casual look while providing sun protection.",
		category: ["hats", "unisex"],
	},
	{
		title: "Men's Slim Fit Trousers",
		price: 500,
		image: "https://picsum.photos/id/1015/300/",
		description: "Modern slim-fit trousers crafted for comfort and style.",
		category: ["mens", "trousers"],
	},
	{
		title: "Women's Ethnic Kurti",
		price: 600,
		image: "https://picsum.photos/id/1016/300/",
		description:
		"A beautifully designed ethnic kurti suitable for festivals and daily wear.",
		category: ["womens", "kurti"],
	},
	{
		title: "Unisex Winter Hoodie",
		price: 300,
		image: "https://picsum.photos/id/1022/300/",
		description: "A thick and comfortable hoodie designed for colder weather.",
		category: ["hoodie", "unisex"],
	},
	{
		title: "Stylish Fedora Hat",
		price: 400,
		image: "https://picsum.photos/id/1018/300/",
		description: "A stylish fedora hat perfect for accessorizing your outfits.",
		category: ["hats", "unisex"],
	},
	{
		title: "Men's Casual Trousers",
		price: 500,
		image: "https://picsum.photos/id/1019/300/",
		description:
		"Casual trousers made with breathable fabric, ideal for everyday wear.",
		category: ["mens", "trousers"],
	},
	{
		title: "Women's Designer Kurti",
		price: 600,
		image: "https://picsum.photos/id/1020/300/",
		description:
		"A designer kurti with intricate patterns for an elegant appearance.",
		category: ["womens", "kurti"],
	},
	{
		title: "Men's Formal Trousers",
		price: 500,
		image: "https://picsum.photos/id/1021/300/",
		description:
		"Elegant formal trousers perfect for business meetings and events.",
		category: ["mens", "trousers"],
	},
	{
		title: "Women's Party Wear Kurti",
		price: 600,
		image: "https://picsum.photos/id/1022/300/",
		description: "A stunning kurti designed for parties and celebrations.",
		category: ["womens", "kurti"],
	},
];

import { collection, addDoc } from "firebase/firestore";
import { db } from "./filrebase.utils";

export const uploadProducts = async () => {
	try {
		const productsCollectionRef = collection(db, "products");

		for (const product of data) {
			await addDoc(productsCollectionRef, product);
		}
	} catch (error) {
		console.error("Error adding products: ", error);
	}
};
