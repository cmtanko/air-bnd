import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { allSuggestions } from "../../../_Server/controllers/location/locationController";

const handler = nc({ onError });
dbConnect();
handler.get(allSuggestions);

export default handler;
