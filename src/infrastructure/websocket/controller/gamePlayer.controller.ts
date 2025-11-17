import { buyStack } from "@/application/use-cases/GamePlayer/buy-stack.case";
import { WsServer } from "@/infrastructure/websocket/WsServer";
import { buyDiscard } from "@/application/use-cases/GamePlayer/buy-discard.case";
import { exchangeCard } from "@/application/use-cases/GamePlayer/exchange-card.case";
import { cutting } from "@/application/use-cases/GamePlayer/cutting-case";
import { discard } from "@/application/use-cases/GamePlayer/discard.case";
import { stop } from "@/application/use-cases/GamePlayer/stop.case";
import { RoomDTO } from "@/application/dto/room.dto";
import { dealFinish } from "@/application/use-cases/GamePlayer/deal-finish.case";
import { GameEndResDTO, PlayerActionDTO, PlayerIndexCardDTO, PlayerIndexCardResDTO, StopRequestDTO, WrongCutResDTO, WrongStopResDTO } from "@/application/dto/game.dto";
import { endTurn } from "@/application/use-cases/GamePlayer/end-turn.case";
import { spyFinish } from "@/application/use-cases/GamePlayer/spy-finish";

export const gamePlayerController = {

    /*negarHabilidade: (obj: SkillUseDTO) => {

        denySkill(obj, WsServer.updateGame)

    },

    aceitarHabilidade: (obj: SkillUseDTO) => {

        const room = acceptSkill(obj)

        WsServer.updateGame(room)

    },

    enviarHabilidade: (obj: SkillUseDTO, hab: any) => {

        const room = sendSkill(obj.salaID, hab)

        WsServer.updateGame(room)

    },

    usouHabilidade: (obj: SkillUseDTO) => {

        usedSkill(obj, WsServer.updateGame)

    },*/

    dealFinish: (dto: RoomDTO) => {

        const yes = dealFinish(dto)

        if (yes) 
            WsServer.io.to(dto.roomID).emit("dealFinish")

    },

    spyFinish: (dto: RoomDTO) => {

        const yes = spyFinish(dto)

        if (yes)
            WsServer.io.to(dto.roomID).emit("spyFinish")

    },

    buyStack: (dto: PlayerActionDTO) => {

        const resDTO = buyStack(dto)

        WsServer.io.to(resDTO.roomID).emit("buyStack", resDTO.res)

    },

    buyDiscard: (dto: PlayerActionDTO) => {

        const resDTO = buyDiscard(dto)

        WsServer.io.to(resDTO.roomID).emit("buyDiscard", resDTO.res)

    },

    exchangeCard: (dto: PlayerIndexCardDTO) => {

        const resDTO = exchangeCard(dto)

        WsServer.io.to(resDTO.roomID).emit("exchangeCard", resDTO.res)

    },

    discard: (dto: PlayerActionDTO) => {

        const roomID = discard(dto)

        WsServer.io.to(roomID).emit("discard")

    },

    endTurn: (dto: RoomDTO) => {

        const turnDTO = endTurn(dto)

        WsServer.io.to(dto.roomID).emit("passTurn", turnDTO)

    },

    cut: (dto: PlayerIndexCardDTO) => {

        const [yes, resDTOAbstract] = cutting(dto)

        console.log("[cut]:", yes, resDTOAbstract);
        
        if (yes) {

            const resDTO = resDTOAbstract as PlayerIndexCardResDTO

            WsServer.io.to(resDTO.roomID).emit("successCut", resDTO.res)

            return
        
        }

        const resDTO = resDTOAbstract as WrongCutResDTO

        WsServer.io.to(resDTO.roomID).emit("wrongCut", resDTO.res)

        return

    },

    stopRequest: (dto: StopRequestDTO) => {

        const [yes, resDTOAbstract] = stop(dto)

        if (yes) {

            const resDTO = resDTOAbstract as GameEndResDTO

            WsServer.io.to(resDTO.roomID).emit("gameEnd", resDTO.res)

            return

        }

        const resDTO = resDTOAbstract as WrongStopResDTO

        WsServer.io.to(resDTO.roomID).emit("wrongStop", resDTO.res)

    }

}