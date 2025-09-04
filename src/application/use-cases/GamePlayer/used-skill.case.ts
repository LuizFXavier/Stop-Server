import { SkillUseDTO } from "@/application/dto/skill.dto"
import { Room } from "@/domain/aggregates/Room"
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"
import { estadoHab } from "@/infrastructure/shared/estadoHab"

export const usedSkill = (obj: SkillUseDTO, update: (room: Room) => void) => {

    const orm = new RoomRepository()

    const room = orm.getByID(obj.salaID)

    room.game.setEstadoHabilidade(estadoHab.inativa)
    room.game.passarVez()
    
    update(room)
    
    room.game.setHabilidade(-1, obj.playerID)

}