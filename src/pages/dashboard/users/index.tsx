import { DataTable } from "@/components/DataTable";
import { User, userColumns } from "../tables/userColumns";
import UserIcon from "@/assets/user-icon.svg";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();

    const data: User[] = [
        {
            id: 1,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 2,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 1,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 2,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 1,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 2,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 1,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 2,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 1,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 2,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 1,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
    ];

    const handleNewUser = () => {
        navigate("register");
    };

    return (
        <>
            <h1 className="text-bold ml-16 text-xl font-semibold text-primary-blue">Usuários cadastrados</h1>

            <div className="m-4 grid h-[95%] grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
                <div className="col-span-3 m-4 mb-8 flex h-[90%] w-full flex-col rounded-2xl bg-[#F7F7F7]">
                    <div className="mx-8 mb-0 mt-8 flex items-center justify-end">
                        <Button
                            className="h-10 w-36 rounded-full bg-secondary-red font-sans text-xs font-bold shadow-md hover:bg-secondary-red/80"
                            onClick={handleNewUser}
                        >
                            <PlusIcon className="mr-1 h-5 w-5" />
                            Novo cadastro
                        </Button>
                    </div>
                    <div className="flex items-center justify-center px-8 pb-8">
                        <div className="w-full">
                            <DataTable columns={userColumns} data={data} rowIcon={UserIcon} />
                        </div>
                    </div>
                </div>

                <div className="col-span-1 m-4 mb-8 ml-4 flex h-[90%] w-full flex-col rounded-2xl bg-[#F2F2FC] lg:ml-8 xl:ml-8">
                    <h3 className="mt-4 text-center text-lg font-semibold text-[#0A0A0A]">Suas notificações</h3>
                </div>
            </div>
        </>
    );
};

export default Users;
