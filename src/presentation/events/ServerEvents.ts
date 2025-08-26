import type Carta from "@/domain/entities/Carta";
import type Player from "@/domain/entities/Player";
import { estadoSala } from "@/infrastructure/shared/estadoSala";

export interface ServerToClientEvents {
    salaID:(salaID:string) => void;
    entrarSala:(hostName:string, regras:[string, number][], listaPlayers:[number, string][], gameRunnig:boolean)=>void;
    gameStart:(listaPlayers:[number, string][], estado:estadoSala) => void;

    updateGame:(players:Player[], 
                descarte:Carta[], 
                pilhaCorte:Carta[], 
                nCartasPilha:number, 
                vez:number, 
                habilidade:{playerID:number,
                            id:number,
                            estado:number
                } | null) => void;
    
    encerrarGame:(objStop:{pontuacoes:number[], ganhador:number}) => void;
    // perguntarHabilidade:(playerID:number, habilidadeID:number) => void;
    // aceitarHabilidade:(playerID:number) => void;
    // aplicarHabilidade:(playerID:number) => void;
    // encerrarHabilidade:(playerID:number) => void;
}

export interface ClientToServerEvents {
    criarSala:(hostName:string) => void;
    entrarSala:(salaID:string, playerName:string) => void;
    configSala:(salaID:string, regras:[string, number][]) => void;

    gameStart:(salaID:string) => void;
    
    //Eventos de player
    comprarPilha:(salaID:string, playerNumber:number) => void;
    comprarDescarte:(salaID:string, playerNumber:number) => void;
    trocarCarta:(salaID:string, playerNumber:number, indexCarta:number) => void;
    cortar:(salaID:string, playerNumber:number, indexCarta:number) => void;
    descartar:(salaID:string, playerNumber:number) => void;
    stop:(obj:{salaID:string, playerID:number}) => void;

    //Eventos habilidade
    aceitarHabilidade:(obj:{salaID:string, playerID:number, habilidadeID:number}) => void;
    negarHabilidade:(obj:{salaID:string, playerID:number, habilidadeID:number}) => void;
    enviarHabilidade:(obj:{salaID:string, playerID:number, habilidadeID:number}, hab:any) => void;
    usouHabilidade:(obj:{salaID:string, playerID:number, habilidadeID:number}) => void;
}

export interface InterServerEvents {

}

export interface SocketData {
    
}