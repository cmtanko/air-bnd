import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { stripeCheckoutSession } from "../../../_Server/controllers/payment/paymentController";
import { isAuthenticatedUser } from "../../../_Server/middlewares/auth";

const handler = nc({ onError });
dbConnect();
handler.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default handler;
