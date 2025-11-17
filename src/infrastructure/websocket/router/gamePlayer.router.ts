import { RoomDTO } from "@/application/dto/room.dto";
import { gamePlayerController } from "../controller/gamePlayer.controller";
import { SocketRouter } from "@/infrastructure/websocket/WsServer";
import { errorHandlerMiddleware } from "../middlewares/socketErrorHandler.middleware";
import { PlayerActionDTO, PlayerIndexCardDTO, StopRequestDTO } from "@/application/dto/game.dto";

export const gamePlayerRouter = (socket: SocketRouter) => {

    socket.on("dealFinish", (dto: RoomDTO) => errorHandlerMiddleware(() => { gamePlayerController.dealFinish(dto) }, dto.roomID))
    socket.on("spyFinish", (dto: RoomDTO) => errorHandlerMiddleware(() => { gamePlayerController.spyFinish(dto) }, dto.roomID))
    socket.on("buyStack", (dto: PlayerActionDTO) => errorHandlerMiddleware(() => { gamePlayerController.buyStack(dto) }))
    socket.on("buyDiscard", (dto: PlayerActionDTO) => errorHandlerMiddleware(() => { gamePlayerController.buyDiscard(dto) }))
    socket.on("exchangeCard", (dto: PlayerIndexCardDTO) => errorHandlerMiddleware(() => { gamePlayerController.exchangeCard(dto) }))
    socket.on("discard", (dto: PlayerActionDTO) => errorHandlerMiddleware(() => { gamePlayerController.discard(dto) }))
    socket.on("endTurn", (dto: RoomDTO) => errorHandlerMiddleware(() => { gamePlayerController.endTurn(dto) }, dto.roomID))
    socket.on("cut", (dto: PlayerIndexCardDTO) => errorHandlerMiddleware(() => { gamePlayerController.cut(dto) }))
    socket.on("stopRequest", (dto: StopRequestDTO) => errorHandlerMiddleware(() => { gamePlayerController.stopRequest(dto) }))

}