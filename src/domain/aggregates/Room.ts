import { Game } from "@/domain/entities/Game";
import { gerarID } from "@/infrastructure/shared/gerarID";

export class Room {

    public readonly id: string;

    public host: string;
    public gameRunnig: boolean;
    public playerNames: Map<number, string>;
    public game: Game;

    constructor(hostName: string) {

        this.id = gerarID();
        this.host = hostName;
        this.gameRunnig = false
        this.playerNames = new Map<number, string>()
        this.game = new Game()

    }

    public startGame() {

        this.gameRunnig = true;
        this.game.start(this.playerNames)

    }

    public setConfig(regras: [string, number][]) {

        const mapRegras = new Map(regras)
        this.game.regras = mapRegras;

        console.log(mapRegras)

    }

}