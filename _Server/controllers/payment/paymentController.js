import Room from "../../models/room";
import User from "../../models/user";
import Booking from "../../models/Booking";

import ErrorHandler from "../../utils/errorHandler";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors";
import APIFeatures from "../../utils/apiFeatures";
import getRawBody from "raw-body";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeCheckoutSession = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.roomId);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.ORIGIN}/bookings/me`,
    cancel_url: `${process.env.ORIGIN}/rooms/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: {
      checkInDate,
      checkOutDate,
      daysOfStay
    },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "AUD",
        quantity: 1
      }
    ]
  });

  res.status(200).json(session);
});

const webhookCheckout = catchAsyncErrors(async (req, res, next) => {
  const rawBody = await getRawBody(req);
  try {
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = await User.findOne({ email: session.customer_email }).id;

      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status
      };

      const { checkInData, checkOutDate, daysOfStay } = session.metadata;

      const booking = await Booking.create({
        room,
        user,
        checkInData,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
      });

      console.warn({booking});
      
      res.status(200).json({
        success: true,
        booking
      });
    }
  } catch (error) {
    console.log("Error in Stripe Checkout Payment =>", error);
  }
});

export { stripeCheckoutSession, webhookCheckout };
