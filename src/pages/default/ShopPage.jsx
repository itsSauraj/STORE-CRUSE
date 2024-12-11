import { useEffect, useState, useContext, Fragment } from "react";

import { NotificationContext } from "../../context/NotificationContext";

import Card from "../../components/shop/Card";

import FilterContainer from "../../components/shop/FiltersContaier";

import { fetchAllProducts } from "../../firebase/shop.utils";

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

	const  { setNotification } = useContext(NotificationContext)

	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		const fetchProducts = async () => {
			const products = await fetchAllProducts()
			if (products.length > 0){
				setData(products)
				setFilteredData(products)
			} else {
				setNotification({
					message: 'Error fetching products',
					status: 'error'
				})
			}
		}
		fetchProducts()
		
		return () => {
			fetchProducts
		}
	}, [])

	return (
		<>
			<h2 className="text-center text-3xl">SHOP </h2>
			{data.length > 0 &&
				<FilterContainer filters={filters} originalData={data} setFilteredData={setFilteredData} />
			}
			
			{filteredData.length > 0 ? (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
						{filteredData.map((item) => (
							<Card item={item} key={item.id}/>
						))}
					</div>
				</>
			) : null
			}
		</>
	);
};

export default ShopPage;
