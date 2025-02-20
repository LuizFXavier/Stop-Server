import type Game from "../Game";
import Habilidade from "./Habilidade";

export default class HabilidadeCompra extends Habilidade{

    efeito(hab:{playerOrigem:number, playerAlvo:number, posAlvo:number}, game:Game): void {
        
        console.log(hab)

        const origem = game.players[hab.playerOrigem]
        const alvo = game.players[hab.playerAlvo]

        let carta = structuredClone(alvo.mao[hab.posAlvo])
        console.log(carta)
        game.descarte.push(carta)
        
        alvo.receberCarta(origem.comprada, hab.posAlvo)
        
        origem.comprada.valor = -1;
        console.log(carta)
    }
}