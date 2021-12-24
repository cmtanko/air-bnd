import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  alert(process.env.STRIPE_API_KEY);
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_API_KEY);
  }

  return stripePromise;
};

export default getStripe;
