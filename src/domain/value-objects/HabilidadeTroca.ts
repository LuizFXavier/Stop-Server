import { Game } from "@/domain/entities/Game";
import Habilidade from "@/domain/value-objects/Habilidade";

export default class HabilidadeTroca extends Habilidade{

    efeito(hab:{players:number[], cartas:number[]}, game:Game): void {
        
        console.log(hab)

        const player1 = game.players[hab.players[0]]
        const player2 = game.players[hab.players[1]]

        const carta1 = structuredClone(player1.mao[hab.cartas[0]])

        const carta2 = structuredClone(player2.mao[hab.cartas[1]])

        player1.receberCarta(carta2, hab.cartas[0])
        player2.receberCarta(carta1, hab.cartas[1])
    }
}