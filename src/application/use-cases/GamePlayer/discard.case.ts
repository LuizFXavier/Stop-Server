import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const discard = (roomID: string, playerNumber: number) => {

    const orm = new RoomRepository()

    const room = orm.getByID(roomID);

    console.log("descarte")

    room.game.descartar(playerNumber);

    return room;

}