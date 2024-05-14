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
}
