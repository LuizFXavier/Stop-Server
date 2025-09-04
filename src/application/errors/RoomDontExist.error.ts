export class RoomDontExistError extends Error {
    constructor(id?: string) {
        super(
            id ?
            `Sala com id: ${id}, não existe!` 
            :
            `Sala não existe.`);
        this.name = "RoomDontExistError"
    }
}