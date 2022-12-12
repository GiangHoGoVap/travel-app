import express from 'express';
import Stripe from 'stripe';
import { SECRET_KEY } from './credentials.js';

const app = express();

app.post('/payment-sheet', async (req, res) => {
  const stripe = new Stripe(SECRET_KEY, {
    apiVersion: '2022-11-15',
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5099,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  return res.json({
    paymentIntent: paymentIntent.client_secret,
  });
});
app.listen(8888, () => console.log('I am running!!'));
