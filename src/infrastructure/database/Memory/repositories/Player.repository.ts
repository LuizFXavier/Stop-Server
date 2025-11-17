import { PlayerDontExistError } from "@/application/errors/PlayerDontExist.error";
import { Player } from "@/domain/entities/Player";
import { IPlayerRepository } from "@/domain/repositories/IPlayerRepository";

export class PlayerRepository implements IPlayerRepository {

    private static data: Map<number, Player> = new Map<number, Player>();
    private static count: number | null = null

    getByID(id: number): Player {

        const room = PlayerRepository.data.get(id)

        if (!room)
            throw PlayerDontExistError

        return room

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
            throw PlayerDontExistError

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

            if (PlayerRepository.count == null)
                PlayerRepository.count = -1

            PlayerRepository.count += 1

            const id = PlayerRepository.count

            player.id = id

            console.log(PlayerRepository.count, player.id);

        }

        PlayerRepository.data.set(player.id, player)

        return player.id

    }

}