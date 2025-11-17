import { RoomDTO } from "@/application/dto/room.dto";
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository";
import { CounterManager } from "@/infrastructure/shared/CounterManager";

export const dealFinish = (dto: RoomDTO) => {

    const gameOrm = new GameRepository() 

    const game = gameOrm.getByRoomId(dto.roomID)

    CounterManager.init("dealFinish")

    let res = false

    const i = CounterManager.add("dealFinish")

    if (i == game.playersId.length) {

        CounterManager.reset("dealFinish")

        res = true

    }

    console.log("[dealFinish]: valor contador", i , res);

    gameOrm.save(game)

    return res

}