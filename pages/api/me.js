import nc from "next-connect";
import dbConnect from "../../_Server/config/dbConnect";

import { currentUserProfile } from "../../_Server/controllers/auth/authController";

import { isAuthenticatedUser } from "../../_Server/middlewares/auth";
import onError from "../../_Server/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;
