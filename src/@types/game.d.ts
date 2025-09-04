export {}

declare global {

    type corte = {pN:number, pos:number, carta:Carta, playerComprou:boolean}

    type GameRules = [string, number][]

    type Players = [number, string][]

}