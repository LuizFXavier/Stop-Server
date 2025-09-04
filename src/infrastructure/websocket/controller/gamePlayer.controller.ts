import { estadoHab } from "@/infrastructure/shared/estadoHab";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "@/presentation/events/ServerEvents";
import { Socket } from "bun";
import { buyStack } from "@/application/use-cases/GamePlayer/buy-stack.case";
import { WsServer } from "@/infrastructure/websocket/WsServer";
import { buyDiscard } from "@/application/use-cases/GamePlayer/buy-discard.case";
import { exchangeCard } from "@/application/use-cases/GamePlayer/exchange-card.case";
import { cutting } from "@/application/use-cases/GamePlayer/cutting-case";
import { discard } from "@/application/use-cases/GamePlayer/discard.case";
import { SkillUseDTO } from "@/application/dto/skill.dto";
import { denySkill } from "@/application/use-cases/GamePlayer/deny-skill.case";
import { acceptSkill } from "@/application/use-cases/GamePlayer/accept-skil.case";
import { sendSkill } from "@/application/use-cases/GamePlayer/send-skill.case";
import { stop } from "@/application/use-cases/GamePlayer/stop.case";
import { usedSkill } from "@/application/use-cases/GamePlayer/used-skill.case";

export const gamePlayerController = {

    comprarPilha: (roomID: string, playerNumber: number) => {

        const room = buyStack(roomID, playerNumber)

        WsServer.updateGame(room)

    },

    comprarDescarte: (roomID: string, playerNumber: number) => {

        const room = buyDiscard(roomID, playerNumber)

        WsServer.updateGame(room)

    },

    trocarCarta: (roomID: string, playerNumber: number, indexCard: number) => {

        const room = exchangeCard(roomID, playerNumber, indexCard)

        WsServer.updateGame(room)

    },

    cortar: (roomID: string, playerNumber: number, indexCard: number) => {

        cutting(roomID, playerNumber, indexCard, WsServer.updateGame)

    },

    descartar: (roomID: string, playerNumber: number) => {

        const room = discard(roomID, playerNumber)

        WsServer.updateGame(room)

    },

    negarHabilidade: (obj: SkillUseDTO) => {

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

    stop: (obj: SkillUseDTO) => {

        const { room, objStop } = stop(obj)

        if(!objStop) {

            WsServer.updateGame(room)
            return;
        
        }

        WsServer.io.to(obj.salaID).emit("encerrarGame", objStop)

    },

    usouHabilidade: (obj: SkillUseDTO) => {

        usedSkill(obj, WsServer.updateGame)

    }

}