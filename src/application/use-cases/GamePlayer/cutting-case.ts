import { Room } from "@/domain/aggregates/Room";
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const cutting = (roomID: string, playerNumber: number, indexCard: number, update: (room: Room) => void) => {

    const orm = new RoomRepository()

    const room = orm.getByID(roomID);
                
    console.log("Corte")
    
    room.game.cortar(playerNumber, indexCard);

    update(room)

    setTimeout(() => {
        room.game.computarCorte()
        update(room)
        console.log("computou corte")
    }, 1500);

}