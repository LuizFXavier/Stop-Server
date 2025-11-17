import { RoomDTO, JoinConfigDTO, JoinRoomDTO } from "@/application/dto/room.dto"
import { dealFinish } from "@/application/use-cases/GamePlayer/deal-finish.case"
import { gameInit } from "@/application/use-cases/Room/game-init.case"
import { joinRoom } from "@/application/use-cases/Room/join-room.case"
import { SocketRouter, WsServer } from "@/infrastructure/websocket/WsServer"

export const roomController =  {

    joinRoom: async(socket: SocketRouter, dto: JoinRoomDTO) => {

        let joinConfig: JoinConfigDTO

        try {
            
            joinConfig = await joinRoom(dto)

        } catch (e) {
            console.error(e);
            return
        }

        socket.join(dto.roomID)

        WsServer.io.to(dto.roomID).emit("joinRoom", 
            joinConfig
        )

    },

    gameStart: (dto: RoomDTO) => {

        WsServer.io.to(dto.roomID).emit("gameStart")       

    },

    gameInit: (dto: RoomDTO) => {

        const res = gameInit(dto)

        WsServer.io.to(dto.roomID).emit("gameInit", res)

    }

}