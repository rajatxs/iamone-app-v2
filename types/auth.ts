export interface SignupRequestPayload {
   username: string
   email: string
   password: string
}

export interface SignupResponse {
   result: {
      accessToken: string
      refreshToken: string
   }
}

export interface LoginRequestPayload {
   username?: string
   email?: string
   password: string
}

export interface LoginResponse {
   result: {
      accessToken: string
      refreshToken: string
   }
}
