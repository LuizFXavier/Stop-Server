import { randomUUIDv7 } from "bun"
import { PlayerUser } from "./PlayerUser";
import { InvalidEmailError } from "@/application/errors/InvalidEmail.error";
import { InvalidPasswordError } from "@/application/errors/InvalidPassword.error";

export class User extends PlayerUser {

    private static readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public email: string
    public password: string
    public is_valid: boolean
    public winners: number
    public readonly created_at?: Date
    public readonly updated_at?: Date

    private constructor(user: {id: string, name: string, email: string, password: string, is_valid: boolean, winners: number, created_at?: Date, updated_at?: Date}) {
        super(user.id, user.name)
        this.email = user.email
        this.password = user.password
        this.is_valid = user.is_valid
        this.winners = user.winners
        this.created_at = user.created_at
        this.updated_at = user.updated_at
    }
    
    public static async create(user: {
        name: string, 
        email: string, 
        password: string,
    }) {

        if (user.password.trim().length < 8)
            throw new InvalidPasswordError(user.password);

        if (!User.emailRegex.test(user.email))
            throw new InvalidEmailError(user.email);
            

        const id = randomUUIDv7("hex")

        const passwordHash = await Bun.password.hash(user.password) 

        const newUser = new User({
            id: id, 
            name: user.name, 
            email: user.email, 
            password: passwordHash,
            is_valid: false,
            winners: 0
        }) 

        return newUser

    }

    public static persistenceToDomain(user: {id: string, name: string, email: string, password: string, is_valid: boolean, winners: number, created_at: Date, updated_at: Date}) {

        return new User(user)

    }

}