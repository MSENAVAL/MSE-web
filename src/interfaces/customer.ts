export interface Customer {
    id: number;
    nome: string;
    cnpj: string;
    email: string;
    nomeRepresentante: string;
    cargo: string;
    status: boolean;
    senha?: string;
    confirmarSenha?: string;
    userId?: string;
}
