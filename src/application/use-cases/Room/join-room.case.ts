import { JoinConfigDTO } from "@/application/dto/room.dto";
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const joinRoom = (roomID: string, playerName: string) => {

    const orm = new RoomRepository()

    const room = orm.getByID(roomID)

    room.playerNames.set(room.playerNames.size, playerName) 

    const joinConfigDTO = {
        host: room.host,
        rules: Array.from(room.game.regras.entries()),
        players: Array.from(room.playerNames.entries()),
        gameRunnig: room.gameRunnig
    } as JoinConfigDTO

    return joinConfigDTO

}