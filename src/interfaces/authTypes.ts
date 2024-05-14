// authTypes.ts
export interface LoginData {
    email: string;
    senha: string;
}

export interface LoginResponseData {
    token: string;
    userId: string;
    userRole: string;
    clienteCadastrado: any;
    cadastroUsuario: any;
    expiresIn: string;
    message?: string;
}

export interface LoginResponseError {
    token?: null;
    message: string;
}
