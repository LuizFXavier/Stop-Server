import { CreateRoomDTO } from "@/application/dto/room.dto"
import { Room } from "@/domain/aggregates/Room"
import { Game } from "@/domain/entities/Game"
import { Player } from "@/domain/entities/Player"
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository"
import { PlayerRepository } from "@/infrastructure/database/Memory/repositories/Player.repository"
import { RoomRepository } from "@/infrastructure/database/Memory/repositories/Room.repository"
import { GuestUserRepository } from "@/infrastructure/database/Memory/repositories/GuestUser.repository"
import { UserRepository } from "@/infrastructure/database/postgresql/repositories/User.repository"
import { GuestUser } from "@/domain/entities/GuestUser"
import { User } from "@/domain/entities/User"

export const createRoom = async(roomDTO: CreateRoomDTO) => {

    const roomOrm = new RoomRepository()

    const guestUserOrm = new GuestUserRepository()

    const userOrm = new UserRepository()

    const playerOrm = new PlayerRepository()

    const gameOrm = new GameRepository()

    let user: User | GuestUser  

    if (guestUserOrm.existByID(roomDTO.userID))
        user = guestUserOrm.getByID(roomDTO.userID)

    else
        user = await userOrm.getByID(roomDTO.userID)

    const player = new Player(user!.name, roomDTO.userID)

    const playerId = playerOrm.save(player)

    const room = new Room(roomDTO.userID)

    roomOrm.save(room)

    const game = new Game(playerId, roomDTO.rules, room.id)

    gameOrm.save(game)

    console.log(roomDTO.userID, room.id, game.playersId)

    return room.id

}