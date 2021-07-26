import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100; // Stripe requeres price is cents
	const publishableKey = 'pk_test_test';

  	const onToken = token => {
		console.log(token);
		alert('Payment Succesful!');
  	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='E-Commerce Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			currency='USD'
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;