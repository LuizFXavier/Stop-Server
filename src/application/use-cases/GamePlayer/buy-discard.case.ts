import { PlayerActionDTO, PlayerCardResDTO } from "@/application/dto/game.dto";
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository";
import { PlayerRepository } from "@/infrastructure/database/Memory/repositories/Player.repository";

export const buyDiscard = (dto: PlayerActionDTO) => {

    const gameOrm = new GameRepository()

    const playerOrm = new PlayerRepository()

    const game = gameOrm.getByPlayerID(dto.playerID);
                
    const player = playerOrm.getByID(dto.playerID)
                
    console.log("Comporar do descare");

    let card = game.discard.pop()

    if (card) {
        player.purchased = card;
        game.playerBuy = true;
    }

    game.playerBuy = false;

    gameOrm.save(game)

    playerOrm.save(player)

    console.log(`[buyDiscard]: ${player.id} | ${card}`);

    return {
        roomID: game.roomId,
        res: {
            identifier: player.id,
            card: card
        }
    } as PlayerCardResDTO

}