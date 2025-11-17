import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userController } from "../controllers/user.controller";

const userRouter = Router()

userRouter.post("/create/guest", authMiddleware, userController.createGuest)

userRouter.post("/register", authMiddleware, userController.register)

userRouter.get("/confirm/:hash", userController.confirm)

userRouter.post("/login", authMiddleware, userController.login)

export { userRouter }