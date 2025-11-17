import { CreateRoomDTO } from "@/application/dto/room.dto"
import { createRoom } from "@/application/use-cases/Room/create-room.case"
import { listRoom } from "@/application/use-cases/Room/list-room.case"
import { Request, Response } from "express"

export const roomController = {

    async createRoom(req: Request, res: Response) {

        const dto = req.body as CreateRoomDTO

        const roomID = await createRoom(dto)

        res.status(200).json({
            roomID: roomID
        })

    },

    async listAllPublicRoom(req: Request, res: Response) {

        const rooms = listRoom()

        res.status(200).json({
            rooms: rooms
        })

    }

}