import { DataTable } from "@/components/DataTable";
import { User, userColumns } from "./tables/userColumns";
import UserIcon from "@/assets/user-icon.png";

const Users = () => {
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

    return (
        <>
            <h1 className="text-bold ml-16 text-xl font-semibold text-primary-blue">Usuários cadastrados</h1>

            <div className="m-4 grid h-[95%] grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
                <div className="col-span-3 m-4 mb-8 flex h-[90%] w-full flex-col rounded-2xl bg-[#F7F7F7]">
                    <div className="flex items-center justify-center p-8">
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
