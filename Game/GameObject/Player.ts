import Carta from "./Carta";

export default class Player{

    mao:Carta[] = [];

    comprada:Carta = new Carta(-1, 0);

    habilidade:number | null = null;

    nome:string;

    constructor(nome:string){
        this.nome = nome;
    }
    
    receberCarta(carta:Carta, index?:number){

        if(index === undefined || index >= this.mao.length)
            this.mao.push(carta)
        else{
            this.mao[index].valor = carta.valor;
            this.mao[index].naipe = carta.naipe;
        }
    }

    posicionarCarta(carta:Carta){
        for(let i = 0; i < this.mao.length; i++){
            
            if(this.mao[i].valor === -1){
                this.mao[i].valor = carta.valor;
                this.mao[i].naipe = carta.naipe;

                return;
            }
        }
        this.mao.push(carta)
    }

    errarCorte(cartaRetornada:Carta, posRetorno:number, cartaPenal:Carta){
        
        this.receberCarta(cartaRetornada, posRetorno);
        this.posicionarCarta(cartaPenal)
    }

    removerCarta(index:number){
        if(index === this.mao.length - 1){
            this.mao.pop()
        }
        else if(index < this.mao.length - 1){
            this.mao[index].valor = -1;
        }
    }

    trocarCarta(index:number){
        
        const carta = this.mao[index];

        this.mao[index] = new Carta(this.comprada.valor, this.comprada.naipe)

        this.comprada.valor = -1;

        return carta;
    }

    comprar(monte:Carta[]):boolean{
        let carta = monte.pop()

        if(carta){
            this.comprada = carta;
            return true;
        }
        return false;
    }

    descartar(descarte:Carta[]):boolean{

        if(this.comprada.valor !== -1){

            console.log(this.comprada)

            descarte.push(new Carta(this.comprada.valor, this.comprada.naipe))

            this.comprada.valor = -1

            return true;
        }

        return false;
    }

    calcularPontos(){
        let total = 0;
        for(let i = 0; i < this.mao.length; i++){
            
            let valor = this.mao[i].valor;
            let naipe = this.mao[i].naipe;
            if(valor === -1 || (valor === 13 && naipe % 2 === 0))
                continue;

            total += valor
        }

        return total;
    }

    getCarta(index:number){

        return this.mao[index]
    }
}