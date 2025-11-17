export class InvalidPasswordError extends Error{
    constructor(pass: string) {
        super(`Senha ${pass} em formato invalido, deve conter ao menos 8 caracteres.`);
        this.name = "InvalidPasswordError"
    }
}