import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"

export const gameStart = (roomID: string) => {

    const orm = new RoomRepository()

    const room = orm.getByID(roomID)
        
    room.startGame()

    console.log(room.playerNames)
    console.log(room.id, "começou")

    const GameStartDTO = {
        players: Array.from(room.playerNames.entries()),
        room
    }

    return GameStartDTO

}