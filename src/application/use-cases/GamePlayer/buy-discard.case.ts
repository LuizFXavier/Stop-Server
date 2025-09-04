import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const buyDiscard = (roomID: string, playerNumber: number) => {

    const orm = new RoomRepository()
    
    const room = orm.getByID(roomID);
                
    console.log("Comporar do descare");
    
    room.game.comprarDescarte(playerNumber);

    return room;

}