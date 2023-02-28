import config from "./index.js";
import stripe from 'stripe';

export const stripeObj = stripe(config.STRIPE_SECRET);