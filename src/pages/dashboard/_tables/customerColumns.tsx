import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DotIcon } from "lucide-react";
import { cnpjMask } from "@/utils/masks";

export type Customer = {
    id: number;
    nome: string;
    cnpj: string;
    email: string;
    status: boolean;
};

export const customerColumns: ColumnDef<Customer, any>[] = [
    {
        id: "nome",
        header: "Nome",
        accessorKey: "nome",
    },
    {
        id: "cnpj",
        header: "CNPJ",
        accessorKey: "cnpj",
        cell: ({ row }) => {
            const cnpj = row.original.cnpj;
            return (
                <div className="flex items-center font-sans">
                    <span>{cnpjMask(cnpj)}</span>
                </div>
            );
        },
    },
    {
        id: "email",
        header: "E-mail",
        accessorKey: "email",
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const isActive = row.original.status;
            return (
                <div className="flex  items-center">
                    <Badge
                        className={`flex w-20 items-center rounded-full bg-opacity-35 p-0 ${isActive ? "hover:text-#365B03 hover:bg-#8EC742 bg-[#8EC742] text-[#365B03]" : "hover:bg-#FB101E hover:text-#790007 bg-[#FB101E] text-[#790007]"}`}
                    >
                        {isActive ? <DotIcon className="h-6 w-6 p-0" /> : <DotIcon className="h-6 w-6 p-0" />}
                        {isActive ? "Ativo" : "Inativo"}
                    </Badge>
                </div>
            );
        },
    },
];
