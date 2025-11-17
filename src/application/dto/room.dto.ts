export interface JoinConfigDTO {
    host: number
    rules: GameRules
    players: Players
    identifier: number
}

export interface RoomDTO {
    roomID: string
}

export interface JoinRoomDTO {
    roomID: string,
    userID: string
}

export interface JoinPrivateRoomDTO {
    roomID: string,
    password: string
}

export interface CreateRoomDTO {
    userID: string
    password?: string
    rules: GameRules
}

export interface GameInitDTO { 
    playersCards: { 
        id: number, 
        cards: {rank: number, suit: number}[] 
    }[],  
    turn: number 
}

export interface AllRoomPublic {
    id: string
    size: number
}[]