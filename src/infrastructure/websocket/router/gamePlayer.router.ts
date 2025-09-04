import { gamePlayerController } from "../controller/gamePlayer.controller";
import { SocketRouter } from "@/infrastructure/websocket/WsServer";

export const gamePlayerRouter = (socket: SocketRouter) => {

    socket.on("comprarPilha", gamePlayerController.comprarPilha)
    socket.on("comprarDescarte", gamePlayerController.comprarDescarte)
    socket.on("trocarCarta", gamePlayerController.trocarCarta)
    socket.on("cortar", gamePlayerController.cortar)
    socket.on("descartar", gamePlayerController.descartar)

}