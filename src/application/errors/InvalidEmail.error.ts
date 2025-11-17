export class InvalidEmailError extends Error{
    constructor(email: string) {
        super(`Email ${email} é invalido.`);
        this.name = "InvalidEmailError"
    }
}