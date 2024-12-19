import { loadStripe } from '@stripe/stripe-js';

export const public_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;	

export const loadStripePromise =  loadStripe(public_key);

export const stripeOptions = {
}