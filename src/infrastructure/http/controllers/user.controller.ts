import { LoginRequestDTO } from "@/application/dto/user.dto";
import { authUser } from "@/application/use-cases/User/auth-user-case";
import { createGuestUser } from "@/application/use-cases/User/create-guest.case";
import { createUser } from "@/application/use-cases/User/create-user.case";
import { login } from "@/application/use-cases/User/login-user.case";
import { authPage } from "@/infrastructure/shared/authPage";
import { Request, Response } from "express";

export const userController = {

    async createGuest(req: Request, res: Response) {

        const dto = createGuestUser() 

        res.status(200).json({
            user: {
                id: dto.id,
                name: dto.name
            }
        })

    },

    async register(req: Request, res: Response) {

        const baseURL = `${req.protocol}://${req.get("host")}`;

        const url = await createUser(req.body, baseURL)

        res.status(200).json({
            Message: "Usuario registrado com sucesso",
            URL: process.env.NODE_ENV == "development" ? url : null,
        })

    },

    async login(req: Request, res: Response) {

        const user = await login(req.body)

        res.status(200).json({
            user: user
        })

    },

    async confirm(req: Request, res: Response) {

        const { hash } = req.params

        authUser(hash)

        res.send(authPage())

    }

}