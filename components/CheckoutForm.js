import React from 'react';
import styled from 'styled-components';
import { useState } from 'react/cjs/react.development';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import nProgress from 'nprogress';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nProgress.start();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setError(error);
    }

	setLoading(false); 
	nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
		{error && <p>{error.message}</p>}
      <CardElement />
      <SickButton>Checkout Now</SickButton>
    </CheckoutFormStyles>
  );
};

export default CheckoutForm;
