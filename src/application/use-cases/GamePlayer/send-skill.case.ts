import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"
import { estadoHab } from "@/infrastructure/shared/estadoHab"

export const sendSkill = (roomID: string, hab: any) => {

    const orm = new RoomRepository()

    const room = orm.getByID(roomID)

    room.game.setEstadoHabilidade(estadoHab.aplicar)
    room.game.aplicarHabilidade(hab)

    return room

}