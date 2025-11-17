import { PlayerIndexCardDTO, PlayerIndexCardResDTO, WrongCutResDTO } from "@/application/dto/game.dto";
import { Card } from "@/domain/entities/Card";
import { GameRepository } from "@/infrastructure/database/Memory/repositories/Game.repository";
import { PlayerRepository } from "@/infrastructure/database/Memory/repositories/Player.repository";

export const cutting = (dto: PlayerIndexCardDTO): (boolean | PlayerIndexCardResDTO)[] | (boolean | WrongCutResDTO)[] => {

    const gameOrm = new GameRepository()
        
    const playerOrm = new PlayerRepository()

    const game = gameOrm.getByPlayerID(dto.playerID);
                
    const player = playerOrm.getByID(dto.playerID)
                
    console.log("Corte")

    const card = structuredClone(player.hand[dto.indexCard])
        
    game.stackCut.push({
        id: player.id!, 
        indexCard: dto.indexCard, 
        card: card, 
        playerBuy: game.playerBuy
    })

    if (dto.indexCard === player.hand.length - 1)
        player.hand.pop()
    
    else if(dto.indexCard < player.hand.length - 1)
        player.hand[dto.indexCard].rank = -1;

    gameOrm.save(game)

    playerOrm.save(player)

    // final stage 
/*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡤⢤⣶⣶⣶⣶⣶⣒⣒⣀⣺⣿⣿⠿⢶⣶⣶⣶⣦⣤⣤⣤⣄⣀⣀⣀⣀⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠛⠒⠲⠦⢤⣉⠙⣿⣿⣿⣟⢿⣿⠿⠿⠿⢿⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣷⡦⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠈⠛⢿⣿⡀⠀⠀⠀⠻
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⠤⢴⣿⣉⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠙⣿⣄⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⡶⠞⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠓⠒⠒⠢⠤⠤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠀⢠⠤⠤⠤⣤⣾⠀⠙⢦⡀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⠴⣾⣛⣩⢴⣿⠿⠶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠙⠒⠒⠒⠤⠤⢤⣤⣾⢿⣴⢏⣀⣀⣤⡼⠻⡆⠀⠈⢷
⠀⠀⠀⠀⠀⢀⣴⠋⠁⠀⠀⠀⠀⠙⠓⠲⠤⠬⠷⠀⠀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠤⠞⠉⠀⠀⠹⡟⠀⠀⠀⠀⠀⢱⠀⢠⣼
⠀⠀⠀⣀⡴⠋⠈⢙⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠢⠤⢄⣀⣠⠴⠛⣋⣠⠴⠒⠉⠉⢉⣲⠶⠀⣀⡠⠤⠒⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⣼⢰⣿⣿
⡀⣠⣼⠏⠀⠀⣰⠟⠦⢤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠓⠒⠒⠒⠋⣉⠤⠒⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⢀⣯⣼⣿⣿
⡟⠋⠹⢤⣠⠞⠁⠀⠀⠀⠀⠈⠉⠐⠲⠤⢄⣀⡀⠀⠀⠀⠀⣀⠤⠤⠤⠤⠤⣄⣀⣀⠀⢀⡠⠖⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⢸⣿⣿⣿⣿
⢻⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⢒⡶⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⣿⡝⣆⠀⠀⠀⠀⢸⠀⠀⣠⣴⠿⣻⣿⣿⠈
⢿⣿⣿⠶⢤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠇⠀⠀⠀⠀⣀⣀⣤⣤⣾⣿⢿⡆⢸⣧⢹⠀⠀⣠⣴⣿⣴⠟⢋⣥⠴⢻⣿⠏⠀
⢸⣿⣿⡇⠀⠘⣿⣶⣦⣤⣐⡒⠀⠀⠀⠀⠀⠀⠈⠑⠲⠤⢤⣀⣀⡀⠀⠀⠀⠀⠀⠀⣀⣀⣞⣀⣠⣤⣾⣿⣿⣿⣿⣿⣿⢻⢸⣿⣾⣿⣾⣤⣾⣿⠿⢋⡡⠞⠉⠉⠉⠉⠀⠀⠀
⣼⡟⣿⡇⠀⠀⢹⣄⠈⠙⠒⠯⣽⣶⢶⣤⣤⣄⣀⣀⠀⠀⠀⠀⠈⠙⠻⠿⠿⠿⠿⠿⠿⠛⠛⠛⢉⣉⣽⠶⣿⠟⣿⣿⣧⣿⣾⣿⣿⡇⢹⡿⠋⣡⠖⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣇⠳⣼⣧⠴⠛⠉⠉⠉⠒⣦⣤⣀⡀⠀⠀⠉⠙⢦⠀⠉⠉⢙⣷⣶⠒⠒⠒⠶⡶⠶⠶⢶⣤⠖⠚⠉⠁⠀⣰⣷⠾⣿⢿⢥⣼⣾⣿⣿⠃⣸⣠⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⠳⣌⣿⢦⣄⠀⢀⣴⣿⣿⣷⣿⡯⣗⠲⠤⣀⡈⣇⠀⠀⠻⡄⠈⣷⠀⠀⠀⡿⠒⠶⠾⢿⠀⠀⠀⢠⣾⡏⠁⣸⡇⢸⡸⢠⣌⢡⣿⡴⣿⠡⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠙⠳⢿⣙⠺⢽⣿⣮⣿⣿⠗⠋⠀⠀⠀⠉⡿⠀⠀⣀⣹⣿⣯⣤⣶⣚⣛⣒⣛⣛⣿⠉⠉⠑⢿⣿⣶⣶⡏⢯⣼⣿⡿⢁⣾⠇⢰⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠙⠢⢬⣙⠛⠧⢤⣀⣀⠀⢀⣴⠃⠀⢀⣹⢦⣤⣉⣉⣯⣍⣹⣿⣿⣿⡃⣀⡤⠴⠛⠋⠁⠀⡇⠘⣜⣏⣠⣿⠋⠀⡞⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠓⠦⢤⣈⡉⠉⠙⠛⠛⠛⠲⠤⠤⠤⠴⣶⣶⣿⣿⢿⡿⣯⠀⠀⠀⠀⠀⢀⣠⡟⠤⠿⠟⠛⠁⠀⠀⠧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠒⠲⠤⢤⣄⣀⣀⣀⣤⣈⣤⣤⠤⣴⣿⣥⠤⠴⠒⠚⠋⠉⡀⠀⠀⠀⠀⠀⠀⠀⠐⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                
*/                                                                                                                                                                                                                                                                            

    let cut = game.stackCut.shift()

    if (!cut)
        throw new Error("sus corte");

    let lastDiscard = game.discard[game.discard.length - 1]
    
    console.log("carta Cortada", cut.card)
    console.log("playerComprou", cut.playerBuy)
    console.log("houveCorte", game.isCut)

    if (lastDiscard.rank != cut.card.rank) {

        const penalCard = game.stack.pop()!

        const playerCut = playerOrm.getByID(cut.id)

        console.log(`[cutting]: ${playerCut.hand} | ${cut.indexCard} | ${cut.card.rank} & ${cut.card.suit}`);

        if(cut.indexCard === undefined || cut.indexCard >= playerCut.hand.length)
            playerCut.hand.push(cut.card)

        else {
            playerCut.hand[cut.indexCard].rank = cut.card.rank;
            playerCut.hand[cut.indexCard].suit = cut.card.suit;
        }
        
        for (let i = 0; i < playerCut.hand.length; i++) {
            
            if (playerCut.hand[i].rank === -1) {
                playerCut.hand[i].rank = penalCard.rank;
                playerCut.hand[i].suit = penalCard.suit;

                break;
            }

        }

        playerCut.hand.push(penalCard)

        gameOrm.save(game)
        
        playerOrm.save(playerCut)

        return [
            false,
            {
                res: {
                    playerID: player.id!,
                    indexCard: dto.indexCard,
                    penaltyCard: penalCard
                },
                roomID: game.roomId
            } as WrongCutResDTO
        ]

    }
    
    game.isCut = true;

    game.discard.push(cut.card)

    gameOrm.save(game)

    console.log("computou corte")
    
    return [
        true,
        {
            res: {
                playerID: player.id!,
                indexCard: dto.indexCard
            },
            roomID: game.roomId
        } as PlayerIndexCardResDTO
    ]

}