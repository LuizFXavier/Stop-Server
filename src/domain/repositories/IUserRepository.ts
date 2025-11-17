import { PlayerUser } from "../entities/PlayerUser"

export interface IUserRepository<T extends PlayerUser> {
    getByID(id: string): Promise<T> | T 
    existByID(id: string): Promise<boolean> | boolean
    save(user: T): Promise<void> | void
    delete(user: T): Promise<void> | void
}