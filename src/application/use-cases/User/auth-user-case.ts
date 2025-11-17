import { UserRepository } from "@/infrastructure/database/postgresql/repositories/User.repository"
import { CryptoManager } from "@/infrastructure/security/CryptoManager"

export const authUser = async(hash: string) => {

    const userOrm = new UserRepository()

    const id = CryptoManager.decrypt(hash)

    const user = await userOrm.getByID(id)

    user.is_valid = true

    await userOrm.save(user)

}