export abstract class PlayerUser {

    public readonly id: string 
    public name: string 

    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }

}