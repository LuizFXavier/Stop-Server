import { RoomDontExistError } from "@/application/errors/RoomDontExist.error";
import { Room } from "@/domain/aggregates/Room";
import { IRoomRepository } from "@/domain/repositories/IRoomRepository";

export class RoomRepository implements IRoomRepository {

    private static data: Map<string, Room> = new Map<string, Room>();

    updateConfigByID(id: string, rules: GameRules) {

        throw new Error("Preicsava desse código mesmo!");

        /*const room = this.getByID(id)

        const mapRegras = new Map(regras)

        this.game.regras = mapRegras;

        console.log(mapRegras)

        this.save(room)
*/
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

    findAllPublic(): Room[] {
        
        const rooms: Room[] = []

        for (const [_, r] of RoomRepository.data) 
            if (r.isPublic) 
                rooms.push(r)

        return rooms

    }

}