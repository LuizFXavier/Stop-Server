import { gerarID } from "@/infrastructure/shared/gerarID";

export class Room {

    public readonly id: string;

    public hostID: string;
    public password?: string
    public isPublic: boolean

    constructor(hostID: string, password: string) {

        this.id = gerarID();
        this.hostID = hostID;
        this.password = password
        this.isPublic = password.trim().length === 0

    }

}