import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { registerUser } from "../../../_Server/controllers/auth/authController";

const handler = nc({ onError });
dbConnect();
handler.post(registerUser);

export default handler;
