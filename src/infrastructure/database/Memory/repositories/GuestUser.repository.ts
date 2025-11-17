import { GuestUserDontExistError } from "@/application/errors/GuestUserDontExist.error";
import { GuestUser } from "@/domain/entities/GuestUser";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class GuestUserRepository implements IUserRepository<GuestUser> {

    private static data = new Map<string, GuestUser>

    getByID(id: string): GuestUser {
        
        const user = GuestUserRepository.data.get(id)
        
        if (!user)
            throw new GuestUserDontExistError(id)

        return user

    }
    existByID(id: string): boolean {
        return GuestUserRepository.data.has(id)
    }

    save(GuestUser: GuestUser): void {
        GuestUserRepository.data.set(GuestUser.id, GuestUser)
    }

    delete(GuestUser: GuestUser): void {
        GuestUserRepository.data.delete(GuestUser.id)
    }

}