import { randomUUIDv7 } from "bun"
import { PlayerUser } from "./PlayerUser"

export class GuestUser extends PlayerUser {

    private constructor(id: string, name: string) {
        super(id, name) 
    }

    public static create(name?: string) {

        const id = randomUUIDv7("hex")

        const username = name ?? "guest_" + id.split('-')[4]

        return new GuestUser(id, username)

    }

}