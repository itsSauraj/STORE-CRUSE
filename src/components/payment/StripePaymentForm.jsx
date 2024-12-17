import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useNavigate } from 'react-router-dom';

import { NotificationContext } from '../../context/NotificationContext';

import PaperButton from '../utilities/PaperButton'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';

import { clearCart } from '../../redux/slices/shop.slice';

const StripePaymentForm = ({ amount }) => {
	
	const navigate = useNavigate()
	const dispatch = useDispatch()
	
	const [paymentIsLoading, setPaymentIsLoading] = useState(false)
	
	const { setNotification } = useContext(NotificationContext)
	const { currentUser } = useSelector(state => state.user)

	amount = amount * 100;

	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('stripe', stripe)

		if (!stripe || !elements) {
			return;
		}

		setPaymentIsLoading(true)

		const response = await fetch('/.netlify/functions/payment-intent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ amount: amount, currency: 'USD' })
		}).then(res => res.json());

		const clientSecret = response.clientSecret.client_secret;
		
		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: `name: ${currentUser.displayName} || id : ${currentUser.uid}`
				}
			}
		});

		setPaymentIsLoading(false)

		if (result.error) {
			setNotification({
				message: result.error.message,
				status: 'error'
			})
		} else {
			if (result.paymentIntent.status === 'succeeded') {
				setNotification({
					message: 'Payment Successful',
					status: 'success'
				})
				dispatch(clearCart())
				navigate('/shop')
			}
		}
	}

	

	return (
		<form className='w-[300px] flex flex-col gap-2 items-center' onSubmit={handleSubmit}>
			<CardElement className='bg-white px-3 py-2 text-xl rounded w-full'/>
			<PaperButton
				isLoading={paymentIsLoading}
				type='submit'
				value='Pay'
				className='dark:bg-primary bg-secondary px-2 py-1 dark:text-secondary text-primary
					dark:hover:before:bg-primary dark:hover:before:text-secondary 
					hover:before:bg-secondary hover:before:text-primary
				'
			/>
		</form>
	);
};

StripePaymentForm.propTypes = {
	amount: PropTypes.number.isRequired
}

export default StripePaymentForm;