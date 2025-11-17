import { Card } from "@/domain/entities/Card";
import Habilidade from "@/domain/value-objects/Habilidade";

export class Game {

    id?: number
    
    playersId: number[] = []

    stack: Card[] = []
    discard: Card[] = []
    stackCut: cut[] = []
    turn: number = 0;

    isCut: boolean = false;
    playerBuy: boolean = false;

    gameRunnig: boolean

    orderPlayer: number = 1;

    skill: Habilidade | null = null;

    rules: Map<string, number>

    roomId: string;

    constructor(hostPlayer: number, rules: GameRules, roomId: string) {

        this.playersId.push(hostPlayer)
        this.rules = new Map(rules)
        this.roomId = roomId
        this.gameRunnig = false

        /*this.rules.set("as", 0)
        this.rules.set("coringa", 0)
        this.rules.set("tirar10", 0)
        this.rules.set("6", 0)
        this.rules.set("7", 1)
        this.rules.set("8", 1)
        this.rules.set("9", 1)
        this.rules.set("10", 1)
        this.rules.set("Q", 1)
        this.rules.set("J", 1)
        this.rules.set("numCartas", 4)*/

    }

    /*

    setHabilidade(habilidadeID:number, playerID:number){

        let simbolo = habilidadeID.toString()

        switch (simbolo){
            case "11":
                simbolo = "Q";
                break;
            case "12":
                simbolo = "J";
                break;
            case "13":
                simbolo = "K";
                break;
            case "1":
                simbolo = "A";
                break;
            default:
                break;
        }

        switch (simbolo) {

            case "7":
            case "8":
                this.habilidade = new HabilidadeCompra(habilidadeID, playerID)
                break;

            case "9":
            case "10":
                this.habilidade = new Habilidade(habilidadeID, playerID)
                break;

            case "Q":
            case "J":
                this.habilidade = new HabilidadeTroca(habilidadeID, playerID)
                break;

            default:
                this.habilidade = null;
                break;
        }

        if(!this.regras.get(simbolo)){
            this.habilidade = null;
        }
    }

    setEstadoHabilidade(estado:number){
        if(this.habilidade){
            this.habilidade.estado = estado
        }
    }

    aplicarHabilidade(hab:any){
        if(this.habilidade)
            this.habilidade.efeito(hab, this)
    }

    public verificarHabilidade(carta:Carta){
        if(carta.valor === 9 || carta.valor === 10){
            return true;
        }
    }

    */

}