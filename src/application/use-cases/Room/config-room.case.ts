import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"

export const configRoom = (roomID: string, rules: GameRules) => {

    const orm = new RoomRepository()

    orm.updateConfigByID(roomID, rules)

}