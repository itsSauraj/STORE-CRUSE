import { useState } from "react";
import Card from "../../components/shop/Card";

import FilterContainer from "../../components/shop/FiltersContaier";
import { useSelector } from "react-redux";

import errorProductsImg from "../../assets/images/error-loading.png";
import noProductsImg from "../../assets/images/no-products.png";
import loadingImg from "../../assets/gifs/loading.gif";

import { RootState } from "../../redux/rootReducer";

const filters = [
	"mens",
	"womens",
	"shirts",
	"trousers",
	"hoodie",
	"unisex",
	"hats",
	"kurti",	
];

const ShopPage = () => {

	const { products, isProductLoading, errorLoadingProducts } = useSelector((state : RootState) => state.shop)
	const [filteredData, setFilteredData] = useState(products);

	return (
		<>
			<h2 className="text-center text-3xl">SHOP </h2>
			{products &&
				<FilterContainer filters={filters} originalData={products} setFilteredData={setFilteredData} />
			}
			<div className="w-full flex items-center justify-center ">
				{isProductLoading && <img src={loadingImg} alt="Loading Products" className="invert mix-blend-multiply opacity-20"/> }
				{!isProductLoading && errorLoadingProducts && <img src={errorProductsImg} alt="Error ProductsImg"/> }
				{!isProductLoading && filteredData.length === 0 && <img src={noProductsImg} alt="No Products"/> }
			</div>
			
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
