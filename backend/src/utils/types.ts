export type JWTPayloadType={
    id:number;
    email:string;
}

export type AccessTokenType ={
    accessToken:string;
}

export type LoginData ={
    accessToken:string;
    user,
    refreshToken:string
}

export type RegisterData ={
    accessToken:string;
    user,
    refreshToken:string
}