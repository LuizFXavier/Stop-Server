import Carta from "./Carta";

export default class Baralho{

    public static criaBaralho(coringa?:number):Carta[]{

        let cartas:Carta[] = [];

        for(let i = 0; i < 4; i++){
            for(let j = 1; j <= 13; j++){
                cartas.push(new Carta(j, i))
            }
        }

        return cartas;
    }
}