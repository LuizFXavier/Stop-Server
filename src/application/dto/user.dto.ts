export interface CreateGuestUserReponseDTO {
    id: string
    name: string
}

export interface CreateUserRequestDTO {
    name: string
    email: string
    password: string
}

export interface LoginRequestDTO {
    email: string
    password: string
}