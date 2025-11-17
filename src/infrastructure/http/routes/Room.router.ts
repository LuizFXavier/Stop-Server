import { Router } from "express";
import { roomController } from "../controllers/room.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const roomRouter = Router()

roomRouter.post("/create", authMiddleware, roomController.createRoom)

roomRouter.get("/list/public", authMiddleware, roomController.listAllPublicRoom)

roomRouter.post("/join/private", authMiddleware, roomController.joinPrivateRoom)

export { roomRouter }