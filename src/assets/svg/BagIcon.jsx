import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

import PropTypes from "prop-types";

const BagIcon = ({ width=1024, height=1024, fill="none", strokeColor="stroke-primary dark:stroke-secondary", textColor="fill-primary dark:fill-secondary" , count=0 }) => {
	
	const { cart } = useContext(ShopContext)
	if (cart){
		count = cart.reduce((acc, item) => acc + item.quantity, 0)
	}
	
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg"  width={width} height={height} fill={fill} id="cart-bags" data-version="1" viewBox="299.12 257.331 420.088 523.167">
				<path className={strokeColor} strokeWidth="15" d="M378.096 400.934C379.143 392.13 386.608 385.5 395.474 385.5H626.011C634.829 385.5 642.269 392.06 643.373 400.808L683.008 714.808C684.327 725.26 676.181 734.5 665.646 734.5H358.148C347.664 734.5 339.533 725.345 340.77 714.934L378.096 400.934Z"/>
				<circle cx="438" cy="458" r="12.5" stroke="#000" strokeWidth="5"/>
				<circle cx="558" cy="458" r="12.5" stroke="#000" strokeWidth="5"/>
				<path className={strokeColor} strokeWidth="10" d="M559 454V409.527V344C559 310.311 531.689 283 498 283V283C464.311 283 437 310.311 437 344V409.527V454"/>
				<path className={strokeColor} strokeWidth="10" d="M596 384V357.733V344C596 310.311 568.689 283 535 283V283C501.311 283 474 310.311 474 344V357.733V384"/>

				{count < 99 ? (
					<text 
						className={textColor}
						style={{
							fontSize: '210.7px', 
							whiteSpace: 'pre'
						}} 
						x= {count < 10 ? "445.163" : "410.143" }
						y="680.586"
					>
						{count}
					</text>
				): (
					<>
						<text
							className={textColor}
							style={{
								fontSize: "195px",
								whiteSpace: 'pre'
							}}
							x="410.143" y="680.586"
						>99</text>
						<text
							className={textColor}
							style={{
								fontSize: "200px",
								whiteSpace: 'pre'
							}} 
							x="560.211" y="580.586">
								+
						</text>
					</>
				) }
			</svg>
		</>
	)
}

export default BagIcon

BagIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
	strokeColor: PropTypes.string,
	textColor: PropTypes.string,
	count: PropTypes.number
}