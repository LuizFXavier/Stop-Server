import { GameInitDTO, RoomDTO } from "@/application/dto/room.dto";
import { Card } from "@/domain/entities/Card";
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository";
import { PlayerRepository } from "@/infrastructure/database/Memory/repositories/Player.repository";

export const gameInit = (dto: RoomDTO) => {

    const gameOrm = new GameRepository()

    const playerOrm = new PlayerRepository()

    const game = gameOrm.getByRoomId(dto.roomID)

    const playersCards: { id: number, cards: {rank: number, suit: number}[] }[] = []

    if (game.gameRunnig) {

        const players = gameOrm.getAllPlayersByRoomID(dto.roomID)

        for (let i = 0; i < players.length; i++) 
            playersCards.push({
                id: players[i].id!,
                cards: players[i].hand
            })


    } 
    else {

        game.gameRunnig = true;

        game.stack = createDeck();
        
        const players = gameOrm.getAllPlayersByRoomID(dto.roomID)

        for (let i = 0; i < players.length; i++) {

            for (let j = 0; j < game.rules.get("numCartas")!; j++) {

                players[i].hand.push(game.stack.pop()!)

                playerOrm.save(players[i])

            }

            playersCards.push({
                id: players[i].id!,
                cards: players[i].hand
            })

        }

        game.turn = 0

        gameOrm.save(game)

    }

    console.log(game.playersId)
    console.log(game.roomId, "começou")
    console.log(playersCards);
    

    return {
        playersCards: playersCards,
        turn: game.turn
    } as GameInitDTO

}

const createDeck = () => {

    let deck: Card[] = [];

    for(let i = 0; i < 4; i++)
        for(let j = 1; j <= 13; j++)
            deck.push(new Card(j, i));

    return deck

}