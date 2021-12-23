import nc from "next-connect";
import dbConnect from "../../_Server/config/dbConnect";

import { webhookCheckout } from "../../_Server/controllers/payment/paymentController";

import { isAuthenticatedUser } from "../../_Server/middlewares/auth";
import onError from "../../_Server/middlewares/errors";

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false
  }
};

handler.post(webhookCheckout);

export default handler;
