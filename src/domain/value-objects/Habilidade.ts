export default class Habilidade{
    
    id:number;
    playerID:number;
    estado:estadoHab = estadoHab.pergunta;

    constructor(id:number, playerID:number){
        this.id = id;
        this.playerID = playerID;
    }
    efeito(hab:any, game?:any){
        
    }
}