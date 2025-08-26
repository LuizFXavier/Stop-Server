import Player from "@/domain/entities/Player";
import Carta from "@/domain/entities/Carta";
import Baralho from "@/domain/entities/Baralho";
import Habilidade from "@/domain/value-objects/Habilidade";
import HabilidadeTroca from "@/domain/value-objects/HabilidadeTroca";
import HabilidadeCompra from "@/domain/value-objects/HabilidadeCompra";

export class Game{
    
    players:Player[] = []

    pilha:Carta[] = []
    descarte:Carta[] = []
    pilhaCorte:corte[] = []
    vez:number = 0;

    houveCorte:boolean = false;
    playerComprou:boolean = false;

    ordemPlayer:number = 1;

    habilidade:Habilidade | null = null;

    regras:Map<string, number> = new Map()

    constructor(){
        this.regras.set("as", 0)
        this.regras.set("coringa", 0)
        this.regras.set("tirar10", 0)
        this.regras.set("7", 1)
        this.regras.set("8", 1)
        this.regras.set("9", 1)
        this.regras.set("10", 1)
        this.regras.set("Q", 1)
        this.regras.set("J", 1)
        this.regras.set("numCartas", 4)
    }

    public start(listaPlayers:Map<number, string>){

        this.pilha = Baralho.criaBaralho(this.regras.get("coringa"));

        listaPlayers.forEach((nome, id)=>{

            this.players[id] = new Player(nome)

            for(let i = 0; i < this.regras.get("numCartas")!; i++)
                this.players[id].receberCarta(this.pilha.pop()!)
        })

        
        this.vez = Math.floor(Math.random() * Player.length)
    }

    public getUltimaDescarte(){
        return this.descarte[this.descarte.length - 1]
    }

    public getUltimaPilha(){
        return this.pilha[this.pilha.length - 1]
    }

    public comprarPilha(pN:number){

        this.playerComprou = this.players[pN].comprar(this.pilha)
    }
    public comprarDescarte(pN:number){

        this.playerComprou = this.players[pN].comprar(this.descarte)
    }

    public descartar(pN:number){

        this.playerComprou = !this.players[pN].descartar(this.descarte)
        this.houveCorte = false;

        let carta = this.getUltimaDescarte();

        if(this.habilidade && this.habilidade.playerID === pN && this.habilidade.id === carta.valor){
            this.habilidade.estado = estadoHab.emUso;
        }
        else{
            this.setHabilidade(carta.valor, pN)
        }

        if(!this.habilidade){
            this.passarVez()
        }
        else{
            
        }
    }

    public cortar(pN:number, index:number){
        let carta = structuredClone(this.players[pN].mao[index])
        
        this.pilhaCorte.push({pN:pN, pos:index, carta:carta, playerComprou:this.playerComprou})

        this.players[pN].removerCarta(index)

    }

    public computarCorte(){

        let corte = this.pilhaCorte.shift()

        if(!corte)
            return;

        let ultimaDescarte = this.getUltimaDescarte()
        
        console.log("carta Cortada", corte.carta)
        console.log("playerComprou", corte.playerComprou)
        console.log("houveCorte", this.houveCorte)

        if(this.houveCorte || corte.playerComprou || ultimaDescarte===undefined || corte.carta.valor !== ultimaDescarte.valor){

            let cartaPenal = this.pilha.pop()!
            
            this.players[corte.pN].errarCorte(corte.carta, corte.pos, cartaPenal)
            
        }
        else{
            this.descarte.push(corte.carta)
            this.houveCorte = true;
        }

    }

    pedidoStop(pN:number){
        const player = this.players[pN];

        if(pN !== this.vez || player.comprada.valor !== -1){
            
            let cartaPenal = this.pilha.pop()!
            
            player.receberCarta(cartaPenal)

            return;
        }

        let pontuacao:number[] = []
        
        let ganhador = -1;
        let menorP = 0xfffff0;
        for(let i = 0; i < this.players.length; i++){

            let pontos = this.players[i].calcularPontos();
            pontuacao.push(this.players[i].calcularPontos())

            if(pontos < menorP)
                ganhador = i;
        }

        if(pontuacao[ganhador] === pontuacao[pN])
            ganhador = pN;
        
        return {pontuacoes:pontuacao, ganhador:ganhador};
    }

    calcularPontos():number[]{
        let pontuacao:number[] = []
        for(let i = 0; i < this.players.length; i++){
            pontuacao.push(this.players[i].calcularPontos())
        }

        return pontuacao;
    }

    setHabilidade(habilidadeID:number, playerID:number){

        let simbolo = habilidadeID.toString()

        switch (simbolo){
            case "11":
                simbolo = "Q";
                break;
            case "12":
                simbolo = "J";
                break;
            case "13":
                simbolo = "K";
                break;
            case "1":
                simbolo = "A";
                break;
            default:
                break;
        }

        switch (simbolo) {

            case "7":
            case "8":
                this.habilidade = new HabilidadeCompra(habilidadeID, playerID)
                break;

            case "9":
            case "10":
                this.habilidade = new Habilidade(habilidadeID, playerID)
                break;

            case "Q":
            case "J":
                this.habilidade = new HabilidadeTroca(habilidadeID, playerID)
                break;

            default:
                this.habilidade = null;
                break;
        }

        if(!this.regras.get(simbolo)){
            this.habilidade = null;
        }
    }

    setEstadoHabilidade(estado:number){
        if(this.habilidade){
            this.habilidade.estado = estado
        }
    }

    aplicarHabilidade(hab:any){
        if(this.habilidade)
            this.habilidade.efeito(hab, this)
    }

    public verificarHabilidade(carta:Carta){
        if(carta.valor === 9 || carta.valor === 10){
            return true;
        }
    }

    public trocarCarta(pN:number, index:number){

        let carta = this.players[pN].trocarCarta(index)

        this.descarte.push(new Carta(carta.valor, carta.naipe))

        this.houveCorte = false;
        this.playerComprou = false;
        // console.log(this.players[pN].mao[index])
        this.passarVez()
    }


    getCartasCorte(){
        let cartas:Carta[] = [];

        for(let i = 0; i < this.pilhaCorte.length; i++){
            cartas.push(this.pilhaCorte[i].carta)
        }

        return cartas;
    }
    passarVez(){
        this.vez = (this.vez + this.ordemPlayer) % this.players.length;
    }
}