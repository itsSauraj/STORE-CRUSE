import Categories from "../../components/home/Categories";

const categories = [
	{
		id: 1,
		title: "Sneakers",
		image: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 2,
		title: "Shirts",
		image: "https://plus.unsplash.com/premium_photo-1725075088969-73798c9b422c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 3,
		title: "Hats",
		image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 4,
		title: "Mens",
		image: "https://plus.unsplash.com/premium_photo-1664474612991-2147a048883a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 5,
		title: "Womens",
		image: "https://images.unsplash.com/photo-1643825664857-7e6e4124f289?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
]


const HomePage = () => {
	return (
		<Categories categories={categories} />
	);
};

export default HomePage