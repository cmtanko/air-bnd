import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import { allLocations } from "../../../_Server/controllers/location/locationController";

const handler = nc({ onError });
dbConnect();
handler.get(allLocations);

export default handler;
