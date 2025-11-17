export class GameDontExistError extends Error{
    constructor(id?: number) {
        super(
            id ?
            `Jogo com id: ${id}, não existe!` 
            :
            `Jogo não existe.`);
        this.name = "GuestUserDontExistError"
    }
}