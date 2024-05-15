import { DataTable } from "@/components/DataTable";
import { User, userColumns } from "../tables/userColumns";
import UserIcon from "@/assets/user-icon.svg";
import { DotIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const Users = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
            id: 3,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 4,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 5,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 6,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 7,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 8,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 9,
            nome: "John Doe",
            email: "email@email.com",
            setor: "Operacional",
            revisor: true,
            status: true,
        },
        {
            id: 10,
            nome: "Jane Doe",
            email: "email@email.com",
            setor: "Engenharia",
            revisor: false,
            status: false,
        },
        {
            id: 11,
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

    const handleRowClick = (user: User) => {
        setSelectedUser(user);
        navigate(`/users/${user.id}`, { state: { user } });
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1100);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileTable = (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-bold mb-4 items-center text-xl font-semibold text-primary-blue">
                    Usuários Cadastrados
                </h1>
                <div className="mb-4 flex items-center justify-end">
                    <Button
                        className="h-8 w-32 rounded-full bg-secondary-red font-sans text-xs font-bold shadow-md hover:bg-secondary-red/80"
                        onClick={handleNewUser}
                    >
                        <PlusIcon className="mr-1 h-5 w-5" />
                        Novo cadastro
                    </Button>
                </div>
            </div>
            <div className="overflow-auto">
                {data.map((user) => (
                    <div
                        key={user.id}
                        className="mb-4 flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-gray-100"
                        onClick={() => handleRowClick(user)}
                    >
                        <div>
                            <p className="font-semibold">{user.nome}</p>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-600">{user.setor}</p>
                            <p className="text-gray-600">
                                {user.revisor ? "Autorizado para revisar" : "Não autorizado para revisar"}
                            </p>
                        </div>
                        <Badge
                            className={`flex w-20 items-center rounded-full bg-opacity-35 p-0 ${user.status ? "hover:bg-#8EC742 hover:text-#365B03 bg-[#8EC742] text-[#365B03]" : "hover:bg-#FB101E hover:text-#790007 bg-[#FB101E] text-[#790007]"}`}
                        >
                            {user.status ? <DotIcon className="h-6 w-6 p-0" /> : <DotIcon className="h-6 w-6 p-0" />}
                            {user.status ? "Ativo" : "Inativo"}
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    );

    if (isMobile) {
        return mobileTable;
    }

    return (
        <>
            <h1 className="text-bold ml-8 text-xl font-semibold text-primary-blue">Usuários cadastrados</h1>

            <div className="m-4 grid h-[95%] grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
                <div className="col-span-3 m-4 mb-8 flex h-[90%] w-full flex-col rounded-2xl bg-[#F7F7F7]">
                    <div className="m-2 mx-8 mb-0 flex items-center justify-end lg:mt-8 xl:mt-8">
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
