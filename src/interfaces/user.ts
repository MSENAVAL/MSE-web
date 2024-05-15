export interface User {
    id: number;
    nome: string;
    email: string;
    setor: string;
    revisor: boolean;
    status: boolean;
    senha?: string;
    confirmarSenha?: string;
    userId?: string;
}

export interface UserRegisterResponse {
    mensagem: string;
}

export interface UserForgotPasswordResponse {
    message: string;
    userId?: string;
    token?: string;
}

export interface UserResetPasswordByToken {
    userId: string;
    token: string;
    novaSenha: string;
    confirmarSenha: string;
}

export interface UserUpdatePassword {
    senhaAtual: string;
    novaSenha: string;
    confirmarSenha: string;
}
