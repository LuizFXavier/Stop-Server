export class UserDontExistError extends Error {
    constructor(id?: string) {
        super(
            id ?
            `Usuario com id: ${id}, não existe!` 
            :
            `Usuario não existe.`);
        this.name = "UserDontExistError"
    }
}