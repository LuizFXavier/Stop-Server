import { JoinPrivateRoomDTO } from "@/application/dto/room.dto";
import { Room } from "@/domain/aggregates/Room";
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const joinPrivateRoom = (dto: JoinPrivateRoomDTO) => {

    const roomOrm = new RoomRepository()

    let room: Room

    try {
        
        room = roomOrm.getByID(dto.roomID)

    } catch (error) {
        
        console.log("[joinPrivateRoom]: não foi encrotada sala com id:", dto.roomID);
        
        return false

    }
        
    if (room.password === dto.password)
        return true

    return false

}