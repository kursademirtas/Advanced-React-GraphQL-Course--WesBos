import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const stripeLib = loadStripe(
  'pk_test_51IJMuXHeiQgWG9FQOtkBzGg8i69Lx7jxT6Qir19ycsmGYDzrWWBjvLsyp6UiGH1J2bAHEXEQgirSC9vuLSvJgEYX00atVR4oLt'
);

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutForm />
  </Elements>
);
export default Checkout;
