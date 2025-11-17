export class Card {
    
    rank: number;
    suit: number;

    constructor(rank: number, suit: number){
        this.rank = rank;
        this.suit = suit;
    }

    toString() {
        return `{ rank: ${this.rank}, suit: ${this.suit} }`
    }

}