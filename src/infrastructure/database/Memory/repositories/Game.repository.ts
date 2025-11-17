import { RoomDontExistError } from "@/application/errors/RoomDontExist.error";
import { Game } from "@/domain/entities/Game";
import { Player } from "@/domain/entities/Player";
import { IGameRepository } from "@/domain/repositories/IGameRepository";
import { PlayerRepository } from "./Player.repository";
import { PlayerDontExistError } from "@/application/errors/PlayerDontExist.error";
import { GameDontExistError } from "@/application/errors/GameDontExist.error";

export class GameRepository implements IGameRepository {

    private static data: Map<number, Game> = new Map<number, Game>();
    private static count: number | null = null

    getByRoomId(roomID: string): Game {
        
        let game: Game | null = null

        for (const [_, g] of GameRepository.data) 
            if (g.roomId == roomID) {

                game = g

                break

            }

        if (!game)
            throw new GameDontExistError()

        return game 


    }

    getByID(id: number): Game {

        const game = GameRepository.data.get(id)

        if (!game)
            throw new GameDontExistError(id)

        return game

    }

    getAllPlayersByRoomID(roomId: string): Player[] {

        const playerOrm = new PlayerRepository()

        let players: Player[] = []

        for (const [_, g] of GameRepository.data) {

            if (g.roomId == roomId) {

                for (let index = 0; index < g.playersId.length; index++)
                    players.push(playerOrm.getByID(g.playersId[index]))

                break
            }

        }

        if (!players)
            throw new PlayerDontExistError()

        return players 

    }

    findAllPlayersOrderByPoints(gameID: number) {

        const playerOrm = new PlayerRepository()

        const game = this.getByID(gameID)

        let players: Player[] = playerOrm.getAllByIDs(...game.playersId)

        return players.sort((p1, p2) => p1.points - p2.points)

    }


    getByPlayerID(playerID: number) {

        let game: Game | null = null

        for (const [_, g] of GameRepository.data) 
            if (g.playersId.find(id => id == playerID)) {

                game = g

                break

            }

        if (!game)
            throw new GameDontExistError()

        return game 

    }

    existByID(id: number): boolean {
        
        return GameRepository.data.has(id)

    }

    save(game: Game): void {

        if (!game.id) {

            if (GameRepository.count == null)
                GameRepository.count = -1

            GameRepository.count += 1

            const id = GameRepository.count

            game.id = id

        }

        GameRepository.data.set(game.id, game)

    }

}