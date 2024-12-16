import { useState } from "react";
import Card from "../../components/shop/Card";

import FilterContainer from "../../components/shop/FiltersContaier";
import { useSelector } from "react-redux";

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

	const { products } = useSelector(state => state.shop)
	const [filteredData, setFilteredData] = useState(products);

	return (
		<>
			<h2 className="text-center text-3xl">SHOP </h2>
			{products &&
				<FilterContainer filters={filters} originalData={products} setFilteredData={setFilteredData} />
			}
			
			{filteredData ? (
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
