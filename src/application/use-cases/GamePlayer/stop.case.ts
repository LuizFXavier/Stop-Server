import { SkillUseDTO } from "@/application/dto/skill.dto"
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"

export const stop = (obj: SkillUseDTO) => {

    const orm = new RoomRepository()

    const room = orm.getByID(obj.salaID)

    let objStop = room.game.pedidoStop(obj.playerID)

    return { objStop, room }

}