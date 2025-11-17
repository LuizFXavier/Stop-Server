export class EmailDontExistError extends Error {
    constructor(email: string) {
        super(`O email ${email} não está cadastrado.`);
        this.name = "EmailDontExistError"
    }
}