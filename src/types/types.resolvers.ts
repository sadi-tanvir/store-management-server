export type UserSignUpType = {
    userData: {
        name: string;
        email: string;
        password: string
    }
}

export type UserSignInType = {
    userData: {
        email: string;
        password: string
    }
}