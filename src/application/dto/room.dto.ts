import { Room } from "@/domain/aggregates/Room"

export interface JoinConfigDTO {
    host: string
    rules: GameRules
    players: [number, string][]
    gameRunnig: boolean
}

export interface GameStartDTO {
    players: [number, string][]
    room: Room
}