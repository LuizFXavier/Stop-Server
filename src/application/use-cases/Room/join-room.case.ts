import { JoinConfigDTO, JoinRoomDTO } from "@/application/dto/room.dto";
import { Player } from "@/domain/entities/Player";
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository";
import { PlayerRepository } from "@/infrastructure/database/Memory/repositories/Player.repository";
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository";
import { GuestUserRepository } from "@/infrastructure/database/Memory/repositories/GuestUser.repository";
import { UserRepository } from "@/infrastructure/database/postgresql/repositories/User.repository";
import { GuestUser } from "@/domain/entities/GuestUser";
import { User } from "@/domain/entities/User";

export const joinRoom = async(dto: JoinRoomDTO) => {

    const roomOrm = new RoomRepository()

    const playerOrm = new PlayerRepository()

    const gameOrm = new GameRepository()

    const guestUserOrm = new GuestUserRepository()

    const userOrm = new UserRepository()

    const room = roomOrm.getByID(dto.roomID)

    const game = gameOrm.getByRoomId(dto.roomID)

    const players = gameOrm.getAllPlayersByRoomID(dto.roomID)

    let player = players.find(p => p.userID == dto.userID)

    if (!player) {

        console.log(`[joinRoom]: não foi achado player com userID de ${dto.userID}, fazendo procedimento de criar player`);

        let user: User | GuestUser  
        
        if (guestUserOrm.existByID(dto.userID))
            user = guestUserOrm.getByID(dto.userID)
    
        else
            user = await userOrm.getByID(dto.userID)

        player = new Player(user!.name, user!.id)

        player.id = playerOrm.save(player)

        players.push(player)

        game.playersId.push(player.id)

        gameOrm.save(game)

    }

    const identifier = player.id!

    const playerRes: Players = []

    let host: number = -1

    for (let index = 0; index < players.length; index++) {
     
        if (room.hostID == players[index].userID)
            host = players[index].id!;
     
        playerRes.push({ id: players[index].id!, name: players[index].name });

    }

    return {
        host: host,
        rules: Array.from(game.rules.entries()),
        players: playerRes,
        identifier: identifier
    } as JoinConfigDTO

}