import React, { useContext, Fragment } from 'react'


import { NotificationContext } from '../../context/NotificationContext'

import CartItem from './CartItem'

import PaperButton from '../utilities/PaperButton'

import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/slices/shop.slice'

import errorProductsImg from "../../assets/images/error-loading.png";
import loadingImg from "../../assets/gifs/loading.gif";
import emptyCartPNG from '../../assets/images/empty-cart.png';


import PropTypes from 'prop-types'


const CartList = ({setShowModal, cart, isCartLoading, errorLoadingCart}) => {

	const { setNotification } = useContext(NotificationContext)
	const dispatch = useDispatch()

	const handelClearCart = () => {
		dispatch(clearCart())
		setNotification({
			message: 'Cart Cleared',
			status: 'success'
		})
	}

	const total = {
		price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
		quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
	}

	return (
		<>
			{isCartLoading &&
				<div className="w-full flex items-center justify-center ">
					<img src={loadingImg} alt="Loading Products" className="invert mix-blend-multiply opacity-20" />
				</div>
			}
			{!isCartLoading && errorLoadingCart && 
				<div className="w-full flex items-center justify-center ">
					<img src={errorProductsImg} alt="Error ProductsImg" />
				</div>
			}
			{!isCartLoading && !errorLoadingCart && cart.length === 0 &&
				<div className="w-full flex items-center justify-center dark:invert dark:opacity-80">
					<img src={emptyCartPNG} alt="No Products" className='w-[512px]'/>
				</div>
			}

			{!isCartLoading && cart.length > 0 &&
				<div className='w-full md:w-[70%] lg:w-[50%]'>
					<hr className='bg-primary dark:bg-secondary h-[2px] mt-3' />
					{cart.map((item) => (
						<Fragment key={item.id}>
							<CartItem item={item} />
							<hr className='bg-primary dark:bg-secondary h-[2px]' />
						</Fragment>
					))}
					<div className='flex p-7 gap-4 justify-end'>
						<PaperButton
							value='Clear Cart'
							className="
						dark:border-primary border-secondary
						bg-primary dark:bg-secondary
						text-secondary dark:text-primary
						p-3 w-[160px]
					"
							onClick={handelClearCart}
						/>
						<PaperButton
							className="
						dark:border-primary border-secondary
						bg-primary dark:bg-secondary
						text-secondary dark:text-primary
						p-3 w-[160px]
					"
							value={`Checkout - $${total.price}`}
							onClick={() => setShowModal(true)}
						/>
					</div>
				</div>
			}
		</>
	)
}

CartList.propTypes = {
	setShowModal: PropTypes.func,
	cart: PropTypes.array,
	isCartLoading: PropTypes.bool,
	errorLoadingCart: PropTypes.bool,
}

export default CartList