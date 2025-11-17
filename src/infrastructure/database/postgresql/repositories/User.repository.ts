import { User } from "@/domain/entities/User"
import { pg } from "../connection/pg"
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { UserDontExistError } from "@/application/errors/UserDontExist.error";

export class UserRepository implements IUserRepository<User> {

    async getByID(id: string) {

        const users = await pg<any[]>`
            SELECT * FROM users
            WHERE id = ${id}
        `

        if (!users[0])
            throw new UserDontExistError;
            
        const user = User.persistenceToDomain(users[0])

        return user

    }

    async getByEmail(email: string) {

        const users = await pg<any[]>`
            SELECT * FROM users
            WHERE email = ${email}
        `

        if (!users[0])
            throw new UserDontExistError;
            
        const user = User.persistenceToDomain(users[0])

        return user

    }
    
    async existByID(id: string) {
       
        const rows = await pg`SELECT EXISTS (SELECT 1 FROM users WHERE id = ${id})`

        return rows[0].exists as boolean

    }

    async save(user: User) {
        
        await pg`
            INSERT INTO users (
                id, name, email, password, is_valid, winners
            ) 
            VALUES (
                ${user.id}, ${user.name}, ${user.email}, ${user.password}, ${user.is_valid}, ${user.winners}
            )
            ON CONFLICT (id) DO UPDATE SET
                name = ${user.name},
                email = ${user.email},
                password = ${user.password},
                is_valid = ${user.is_valid},
                winners = ${user.winners},
                updated_at = NOW()
        `;

    }

    async delete(user: User) {
       
        await pg`
            DELETE FROM users WHERE id = ${user.id}
        `;
        
    }

}