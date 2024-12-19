import StripePaymentForm from '../payment/StripePaymentForm'

interface CheckOutModalProps {
	total_amount: number
}

const CheckOutModal: React.FC<CheckOutModalProps> = ({ total_amount }) => {
	return (
		<>
			<div>StripePaymentForm</div>
			<StripePaymentForm amount={total_amount} />
		</>
	)
}

export default CheckOutModal