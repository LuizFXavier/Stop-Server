import { CreateGuestUserReponseDTO, LoginRequestDTO } from "@/application/dto/user.dto"
import { UserRepository } from "@/infrastructure/database/postgresql/repositories/User.repository"

export const login = async(dto: LoginRequestDTO) => {

    const userOrm = new UserRepository()

    const user = await userOrm.getByEmail(dto.email)

    if (await Bun.password.verify(dto.password, user.password)) {

        return {
            id: user.id,
            name: user.name
        } as CreateGuestUserReponseDTO

    }

    return null

}