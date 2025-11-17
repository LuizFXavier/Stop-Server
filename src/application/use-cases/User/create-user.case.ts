import { CreateUserRequestDTO } from "@/application/dto/user.dto";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/infrastructure/database/postgresql/repositories/User.repository";
import { NodemailerMailProvider } from "@/infrastructure/providers/NodeMailerProvider";
import { CryptoManager } from "@/infrastructure/security/CryptoManager";
import { emailTemplate } from "@/infrastructure/shared/emailTemplate";

export const createUser = async(dto: CreateUserRequestDTO, baseURL: string) => {

    const userOrm = new UserRepository()

    const user = await User.create({
        name: dto.name,
        email: dto.email,
        password: dto.password
    })

    await userOrm.save(user)

    const confirmURL = baseURL + `/user/confirm/${CryptoManager.encrypt(user.id)}`

    if (process.env.NODE_ENV == "production") {

        const mailProvider = new NodemailerMailProvider()

        await mailProvider.sendMail({
            to: user.email,
            subject: "Confirme seu E-mail",
            body: emailTemplate(user.name, confirmURL)
        })

    }

    return confirmURL

}