import { ColumnDef } from "@tanstack/react-table";

export type Ship = {
    id: number;
    nome?: string;
    numeroIMO: string;
    loa: string;
    b: string;
    numeroGuindaste: string;
    tipoEmbarcacao: string;
    status: boolean;
};

export const shipColumns: ColumnDef<Ship, any>[] = [
    {
        id: "nome",
        header: "Nome",
        accessorKey: "nome",
    },
    {
        id: "numeroIMO",
        header: "n° IMO",
        accessorKey: "numeroIMO",
    },
    {
        id: "loa",
        header: "LOA (M)",
        accessorKey: "loa",
    },
    {
        id: "b",
        header: "B (M)",
        accessorKey: "b",
    },
    {
        id: "numeroGuindaste",
        header: "n° de Guindastes",
        accessorKey: "numeroGuindaste",
    },
];
