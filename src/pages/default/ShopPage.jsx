import { useState } from "react";

import Card from "../../components/shop/Card";

import FilterContainer from "../../components/shop/FiltersContaier";

const data = [
	{
		id: 1,
		title:
			"Product 1 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate!",
		price: 100,
		image: "https://picsum.photos/id/91/300/",
		category: ["mens", "shirt"],
	},
	{
		id: 2,
		title: "Product 2",
		price: 200,
		image: "https://picsum.photos/id/91/300/",
		category: ["womens", "shirt"],
	},
	{
		id: 3,
		title: "Product 3",
		price: 300,
		image: "https://picsum.photos/id/91/300/",
		category: ["hoodie", "unisex"],
	},
	{
		id: 4,
		title: "Product 4",
		price: 400,
		image: "https://picsum.photos/id/91/300/",
		category: ["hats", "unisex"],
	},
	{
		id: 5,
		title: "Product 5",
		price: 500,
		image: "https://picsum.photos/id/91/300/",
		category: ["mens", "trousers"],
	},
	{
		id: 6,
		title: "Product 6",
		price: 600,
		image: "https://picsum.photos/id/91/300/",
		category: ["womens", "kurti"],
	},
	{
		id: 7,
		title: "Product 3",
		price: 300,
		image: "https://picsum.photos/id/91/300/",
		category: ["hoodie", "unisex"],
	},
	{
		id: 8,
		title: "Product 4",
		price: 400,
		image: "https://picsum.photos/id/91/300/",
		category: ["hats", "unisex"],
	},
	{
		id: 9,
		title: "Product 5",
		price: 500,
		image: "https://picsum.photos/id/91/300/",
		category: ["mens", "trousers"],
	},
	{
		id: 10,
		title: "Product 6",
		price: 600,
		image: "https://picsum.photos/id/91/300/",
		category: ["womens", "kurti"],
	},
	{
		id: 11,
		title: "Product 5",
		price: 500,
		image: "https://picsum.photos/id/91/300/",
		category: ["mens", "trousers"],
	},
	{
		id: 12,
		title: "Product 6",
		price: 600,
		image: "https://picsum.photos/id/91/300/",
		category: ["womens", "kurti"],
	},
];

const filters = [
	"mens",
	"womens",
	"shirt",
	"trousers",
	"hoodie",
	"unisex",
	"hats",
	"kurti",
];

const ShopPage = () => {

	const [filteredData, setFilteredData] = useState(data);

	return (
		<>
			<h2 className="text-center text-3xl">SHOP </h2>
			<FilterContainer filters={filters} originalData={data} setFilteredData={setFilteredData} />

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{filteredData.map((item) => (
					<Card item={item} key={item.id}/>
				))}
			</div>
		</>
	);
};

export default ShopPage;
