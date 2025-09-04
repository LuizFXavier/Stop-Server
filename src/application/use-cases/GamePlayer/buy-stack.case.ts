import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const buyStack = (roomID: string, playerNumber: number) => {

    const orm = new RoomRepository()

    const room = orm.getByID(roomID);
                
    console.log("Comporar da pilha")
    
    room.game.comprarPilha(playerNumber);

    return room;

}