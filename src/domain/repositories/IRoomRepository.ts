import { Room } from "../aggregates/Room";

export interface IRoomRepository {
    getByID(id: string): Room
    updateConfigByID(id: string, rules: GameRules): void
    existByID(id: string): boolean
    save(room: Room): void
}