import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository"
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"

export const listRoom = () => {

    const roomOrm = new RoomRepository()

    const gameOrm = new GameRepository()

    return roomOrm.findAllPublic().map(r => { 
        return {
            id: r.id, 
            size: gameOrm.getByRoomId(r.id).playersId.length
        }
    })

}