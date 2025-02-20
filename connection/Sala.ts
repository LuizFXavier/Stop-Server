import Game from "../Game/Game";

export default class Sala{

    public host:string;
    public gameRunnig:boolean = false

    public playerNames:Map<number, string> = new Map()
    public game:Game = new Game()

    constructor(hostName:string){
        this.host = hostName;
    }

    public startGame(){
        this.gameRunnig = true;
        this.game.start(this.playerNames)
    }

    public setConfig(regras: [string, number][]){

        const mapRegras = new Map(regras)
        this.game.regras = mapRegras;

        console.log(mapRegras)
    }
}