import { SocketRouter } from "@/infrastructure/websocket/WsServer"
import { roomController } from "@/infrastructure/websocket/controller/room.controller"

export const roomRouter = (socket: SocketRouter) => {

    socket.on("criarSala", (hostName: string) => roomController.criarSala(socket, hostName))
    socket.on("entrarSala", (salaID: string, playerName: string) => roomController.entrarSala(socket, salaID, playerName))
    socket.on("configSala", roomController.configSala)
    socket.on("gameStart", roomController.gameStart)

}