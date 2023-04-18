export interface SignupRequestPayload {
   username: string
   email: string
   password: string
}

export interface SignupResponse {
   accessToken: string
   refreshToken: string
}

export interface LoginRequestPayload {
   username?: string
   email?: string
   password: string
}

export interface LoginResponse {
   accessToken: string
   refreshToken: string
}
