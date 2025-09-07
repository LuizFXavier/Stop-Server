import { SkillUseDTO } from "@/application/dto/skill.dto"
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"
import { estadoHab } from "@/infrastructure/shared/estadoHab"

export const acceptSkill = (obj: SkillUseDTO) => {

    const orm = new RoomRepository()
        
    const room = orm.getByID(obj.salaID)

    room.game.setEstadoHabilidade(estadoHab.emUso)

    return room

}