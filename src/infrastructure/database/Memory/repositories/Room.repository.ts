import { RoomDontExistError } from "@/application/errors/RoomDontExist.error";
import { Room } from "@/domain/aggregates/Room";
import { IRoomRepository } from "@/domain/repositories/IRoomRepository";

export class RoomRepository implements IRoomRepository {

    private static data: Map<string, Room> = new Map<string, Room>();

    updateConfigByID(id: string, rules: GameRules) {

        const room = this.getByID(id)

        room.setConfig(rules)

    }

    getByID(id: string): Room {

        const room = RoomRepository.data.get(id)

        if (!room)
            throw RoomDontExistError

        return room

    }

    existByID(id: string): boolean {
        
        return RoomRepository.data.has(id)

    }

    save(room: Room): void {

        RoomRepository.data.set(room.id, room)

    }

}