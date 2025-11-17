import { WebSocketErrorDTO } from "@/application/dto/error.dto";
import { GameEndDTO, PassTurnDTO, PlayerActionDTO, PlayerCardDTO, PlayerIndexCardDTO, StopRequestDTO, WrongCutDTO, WrongStopDTO } from "@/application/dto/game.dto";
import { RoomDTO, JoinConfigDTO, JoinRoomDTO, GameInitDTO } from "@/application/dto/room.dto";
import { SkillUseDTO } from "@/application/dto/skill.dto";

export interface ServerToClientEvents {
    
    roomID: (roomID: string) => void;

    joinRoom: (dto: JoinConfigDTO) => void;

    gameStart: () => void;

    gameInit: (dto: GameInitDTO) => void

    dealFinish: () => void

    spyFinish: () => void

    buyStack:(dto: PlayerCardDTO) => void;

    buyDiscard: (dto: PlayerCardDTO) => void
    
    exchangeCard: (dto: PlayerIndexCardDTO) => void;

    discard: () => void;

    passTurn: (dto: PassTurnDTO) => void

    wrongCut: (dto: WrongCutDTO) => void

    successCut: (dto: PlayerIndexCardDTO) => void

    wrongStop: (dto: WrongStopDTO) => void

    gameEnd: (dto: GameEndDTO) => void

    error: (dto: WebSocketErrorDTO) => void

    encerrarGame:(objStop:{pontuacoes:number[], ganhador:number}) => void;

}

export interface ClientToServerEvents {
    
    joinRoom: (dto: JoinRoomDTO) => void;

    gameStart: (dto: RoomDTO) => void;

    gameInit: (dto: RoomDTO) => void

    dealFinish: (dto: RoomDTO) => void

    spyFinish: (dto: RoomDTO) => void
    
    buyStack: (dto: PlayerActionDTO) => void;

    buyDiscard: (dto: PlayerActionDTO) => void;

    exchangeCard: (dto: PlayerIndexCardDTO) => void;

    discard: (dto: PlayerActionDTO) => void;

    endTurn: (dto: RoomDTO) => void;

    cut: (dto: PlayerIndexCardDTO) => void;
    
    stopRequest: (dto: StopRequestDTO) => void

    aceitarHabilidade:(obj: SkillUseDTO) => void;
    negarHabilidade:(obj: SkillUseDTO) => void;
    enviarHabilidade:(obj: SkillUseDTO, hab:any) => void;
    usouHabilidade:(obj: SkillUseDTO) => void;
}

export interface InterServerEvents {

}

export interface SocketData {
    
}