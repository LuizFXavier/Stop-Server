import { Room } from "@/domain/aggregates/Room"
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"

export const createRoom = (hostName: string) => {

    const orm = new RoomRepository()

    const room = new Room(hostName)

    orm.save(room)

    console.log(hostName, room.id)

    return room.id

}