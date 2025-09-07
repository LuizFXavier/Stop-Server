import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const exchangeCard = (roomID: string, playerNumber: number, indexCard: number) => {

    const orm = new RoomRepository()

    const room = orm.getByID(roomID)
            
    console.log("Trocar carta")
    
    room.game.trocarCarta(playerNumber, indexCard);

    return room
    
}