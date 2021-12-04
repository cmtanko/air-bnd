import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import {
  allRooms,
  newRoom
} from "../../../_Server/controllers/rooms/roomControllers";

const handler = nc({onError});
dbConnect();
handler.get(allRooms);
handler.post(newRoom);

export default handler;
