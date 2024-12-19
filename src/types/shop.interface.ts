export interface ProductInterface {
	id: string;
	title: string;
	price: number;
	image: string;
	description: string;
	category: string[];
}

export interface CartInterface extends ProductInterface {
	quantity: number;
}

export type ShopState = {
	cart: CartInterface[],
	products: ProductInterface[],
	isProductLoading: boolean,
	errorLoadingProducts: boolean,
	isCartLoading: boolean,
	errorLoadingCart: boolean,
}
