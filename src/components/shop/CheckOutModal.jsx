import React from 'react'

import StripePaymentForm from '../payment/StripePaymentForm'

import PropTypes from 'prop-types'

const CheckOutModal = ({ total_amount }) => {
	return (
		<>
			<div>StripePaymentForm</div>
			<StripePaymentForm amount={total_amount} />
		</>
	)
}

CheckOutModal.propTypes = {
	total_amount: PropTypes.number.isRequired
}

export default CheckOutModal