import { PlayerDontExistError } from "@/application/errors/PlayerDontExist.error";
import { Player } from "@/domain/entities/Player";
import { IPlayerRepository } from "@/domain/repositories/IPlayerRepository";

export class PlayerRepository implements IPlayerRepository {

    private static data: Map<number, Player> = new Map<number, Player>();
    private static count: number = 0

    getByID(id: number): Player {

        const player = PlayerRepository.data.get(id)

        if (!player)
            throw new PlayerDontExistError(id)

        return player

    }

    getByUserID(id: string): Player {

        let player: Player | null = null

        for (const [_, value] of PlayerRepository.data) {

            if (value.userID == id) {
                player = value
                break
            }

        }

        if (!player)
            throw new PlayerDontExistError()

        return player 

    }

    getAllByIDs(...ids: number[]) {

        const players = new Array<Player>(ids.length)

        for (let i = 0; i < ids.length; i++) {
            
            players[i] = this.getByID(ids[i])
            
        }

        return players

    }

    existByID(id: number): boolean {
        
        return PlayerRepository.data.has(id)

    }

    save(player: Player): number {

        if (!player.id) {

            PlayerRepository.count++

            const id = PlayerRepository.count

            player.id = id

            console.log(PlayerRepository.count, player.id);

        }

        PlayerRepository.data.set(player.id, player)

        return player.id

    }

}