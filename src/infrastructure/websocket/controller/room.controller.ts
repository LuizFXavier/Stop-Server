import { JoinConfigDTO } from "@/application/dto/room.dto"
import { configRoom } from "@/application/use-cases/Room/config-room.case"
import { createRoom } from "@/application/use-cases/Room/create-room.case"
import { gameStart } from "@/application/use-cases/Room/game-start.case"
import { joinRoom } from "@/application/use-cases/Room/join-room.case"
import { estadoSala } from "@/infrastructure/shared/estadoSala"
import { SocketRouter, WsServer } from "@/infrastructure/websocket/WsServer"

export const roomController =  {

    criarSala: (socket: SocketRouter, hostName: string) => {
        
        const roomID = createRoom(hostName)

        socket.emit('salaID', roomID)
        
    },

    entrarSala: (socket: SocketRouter, roomID:string, playerName:string) => {

        let joinConfig: JoinConfigDTO

        try {
            
            joinConfig = joinRoom(roomID, playerName)

        } catch (e) {
            console.error(e);
            return
        }

        socket.join(roomID)

        WsServer.io.to(roomID).emit("entrarSala", 
            joinConfig.host,
            joinConfig.rules, 
            joinConfig.players,
            joinConfig.gameRunnig
        )

    },

    configSala: (roomID:string, rules: GameRules) => {

        configRoom(roomID, rules)

    },

    gameStart: (roomID: string) => {

        const gameStartInfo = gameStart(roomID)

        WsServer.io.to(roomID).emit("gameStart", gameStartInfo.players, estadoSala.game)
            
        WsServer.updateGame(gameStartInfo.room)        

    }

}