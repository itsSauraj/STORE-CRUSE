const dontenv = require('dotenv');
dontenv.config();

const stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY);


exports.handler = async (event) => {
	try{
		const { amount, currency } = JSON.parse(event.body);
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
			payment_method_types: ['card'],	
		});
		return {
			statusCode: 200,
			body: JSON.stringify({ clientSecret: paymentIntent }),
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
}