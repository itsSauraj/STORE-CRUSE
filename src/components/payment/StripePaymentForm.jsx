import { PaymentElement } from '@stripe/react-stripe-js';

const StripePaymentForm = () => {
	return (
		<form>
			<PaymentElement />
			<button>Submit</button>
		</form>
	);
};

export default StripePaymentForm;