import { CreateGuestUserReponseDTO } from "@/application/dto/user.dto"
import { GuestUser } from "@/domain/entities/GuestUser"
import { GuestUserRepository } from "@/infrastructure/database/Memory/repositories/GuestUser.repository"

export const createGuestUser = () => {

    const orm = new GuestUserRepository()

    const user = GuestUser.create()

    orm.save(user)

    return {
        id: user.id,
        name: user.name
    } as CreateGuestUserReponseDTO

}