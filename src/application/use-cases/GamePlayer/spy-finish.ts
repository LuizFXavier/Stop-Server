import { RoomDTO } from "@/application/dto/room.dto";
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository";
import { CounterManager } from "@/infrastructure/shared/CounterManager";

export const spyFinish = (dto: RoomDTO) => {

    const gameOrm = new GameRepository()

    const game = gameOrm.getByRoomId(dto.roomID)

    CounterManager.init("spyFinish")
    
    let res = false

    const i = CounterManager.add("spyFinish")

    if (i == game.playersId.length) {

        CounterManager.reset("spyFinish")

        res = true

    }

    console.log("[spyFinish]: valor contador", i , res);

    gameOrm.save(game)

    return res

}