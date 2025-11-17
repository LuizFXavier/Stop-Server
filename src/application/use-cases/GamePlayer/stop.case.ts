import { GameEndResDTO, StopRequestDTO, WrongStopResDTO } from "@/application/dto/game.dto"
import { User } from "@/domain/entities/User"
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository"
import { PlayerRepository } from "@/infrastructure/database/Memory/repositories/Player.repository"
import { UserRepository } from "@/infrastructure/database/postgresql/repositories/User.repository"

export const stop = (dto: StopRequestDTO) => {

    const userOrm = new UserRepository()

    const gameOrm = new GameRepository()

    const playerOrm = new PlayerRepository()

    const game = gameOrm.getByPlayerID(dto.playerID);

    const players = gameOrm.getAllPlayersByRoomID(game.roomId)
                
    const player = playerOrm.getByID(dto.playerID)

    if (player.id !== (game.turn % game.playersId.length) || player.purchased.rank !== -1) {
        
        let cartaPenal = game.stack.pop()!
        
        player.hand.push(cartaPenal)

        playerOrm.save(player)

        return [
            false,
            {
                res: {
                    idPlayer: player.id,
                    penaltyCard: cartaPenal
                },
                roomID: game.roomId
            } as WrongStopResDTO
        ]

    }

    for (let i = 0; i < players.length; i++){

        let total = 0;

        for(let i = 0; i < player.hand.length; i++){
            
            const { rank, suit } = player.hand[i]

            if(rank === -1 || (rank === 13 && suit % 2 === 0))
                continue;

            total += rank

        }

        players[i].points = total

        playerOrm.save(players[i])

    }

    const playersOrder = gameOrm.findAllPlayersOrderByPoints(game.id!)

    const points = playersOrder.map(p => p.points)

    const minPoints = Math.min(...points)  

    const competitors = playersOrder.filter(p => p.points == minPoints) 

    let playerWinner = player

    if (competitors.find(p => p.id != player.id)) {
        playerWinner = competitors[0]
    }
    
    try {

        let user: User

        userOrm.getByID(playerWinner.userID).then(u => user = u)

        user!.winners = user!.winners + 1 

        userOrm.save(user!)

    } catch (e) {
        console.log("[stop-case]: não foi possivel achar usuario do player", playerWinner);
    }

    return [
        true,
        {
            res: {
                idWinner: playerWinner.id,
                playerIDStop: player.id,
                points: points
            },
            roomID: game.roomId
        } as GameEndResDTO
    ]

}