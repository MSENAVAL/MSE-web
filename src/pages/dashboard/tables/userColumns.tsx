import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DotIcon } from "lucide-react";

export type User = {
    id: number;
    nome: string;
    email: string;
    setor: string;
    revisor?: boolean;
    status: boolean;
};

export const userColumns: ColumnDef<User>[] = [
    {
        id: "nome",
        header: "Nome",
        accessorKey: "nome",
    },
    {
        id: "email",
        header: "E-mail",
        accessorKey: "email",
    },
    {
        id: "setor",
        header: "Setor",
        accessorKey: "setor",
    },
    {
        id: "revisor",
        header: "Revisor",
        accessorKey: "revisor",
        cell: ({ row }) => (row.original.revisor ? "Sim" : ""),
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
                        className={`flex w-20 items-center rounded-full bg-opacity-35 p-0 ${isActive ? "bg-[#8EC742] text-[#365B03]" : "bg-[#FB101E] text-[#790007]"}`}
                    >
                        {isActive ? <DotIcon className="h-6 w-6 p-0" /> : <DotIcon className="h-6 w-6 p-0" />}
                        {isActive ? "Ativo" : "Inativo"}
                    </Badge>
                </div>
            );
        },
    },
];
