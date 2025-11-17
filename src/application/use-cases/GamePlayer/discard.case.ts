import { PlayerActionDTO } from "@/application/dto/game.dto";
import { Card } from "@/domain/entities/Card";
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository";
import { PlayerRepository } from "@/infrastructure/database/Memory/repositories/Player.repository";
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";

export const discard = (dto: PlayerActionDTO) => {

    const gameOrm = new GameRepository()

    const playerOrm = new PlayerRepository()

    const game = gameOrm.getByPlayerID(dto.playerID);

    const player = playerOrm.getByID(dto.playerID)

    console.log("descarte")

    if (player.purchased.rank !== -1) {

            console.log(player.purchased)

            game.discard.push(new Card(player.purchased.rank, player.purchased.suit))

            player.purchased.rank = -1

            game.playerBuy = true

    } 
    else
        game.playerBuy = false;

    game.isCut = false;

    gameOrm.save(game)

    playerOrm.save(player)

    return game.roomId

}