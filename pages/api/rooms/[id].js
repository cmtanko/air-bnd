import nc from "next-connect";
import dbConnect from "../../../_Server/config/dbConnect";
import onError from "../../../_Server/middlewares/errors";

import {
  getRoom,
  updateRoom,
  deleteRoom
} from "../../../_Server/controllers/rooms/roomControllers";

const handler = nc({onError});
dbConnect();
handler.get(getRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
