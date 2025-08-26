declare global {

    enum estadoHab{
        inativa,
        pergunta,
        aguardo,
        selecionar,
        pronta,
        emUso,
        aplicar
    }

    enum estadoSala{
        lobby,
        game,
        final
    }

    type corte = {pN:number, pos:number, carta:Carta, playerComprou:boolean}

}


export {}