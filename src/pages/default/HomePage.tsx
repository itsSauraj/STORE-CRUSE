import Categories from "../../components/home/Categories";

type TypeCategory = {
	readonly id: string,
	readonly title: string,
	readonly image: string
}

const categories: TypeCategory[] = [
	{
		id: '119283alsdn-12das112',
		title: "Sneakers",
		image: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: '219283alsdn-12das112',
		title: "Shirts",
		image: "https://plus.unsplash.com/premium_photo-1725075088969-73798c9b422c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: '319283alsdn-12das112',
		title: "Hats",
		image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: '419283alsdn-12das112',
		title: "Mens",
		image: "https://plus.unsplash.com/premium_photo-1664474612991-2147a048883a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: '519283alsdn-12das112',
		title: "Womens",
		image: "https://images.unsplash.com/photo-1643825664857-7e6e4124f289?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
]

const HomePage: React.FC = () => {
	return (
		<>
			<h1 className="text-4xl text-center font-bold mt-4 text-primary dark:text-secondary"> 
				WELCOME TO CRUSE CLOTHIG STORE
			</h1>
			<Categories categories={categories} />
		</>
	);
};

export default HomePage