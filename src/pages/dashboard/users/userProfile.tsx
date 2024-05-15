import { useState, useEffect } from "react";
import UserIcon from "@/assets/user-icon.svg";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DotIcon, Eye, EyeOff } from "lucide-react";
import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Edit } from "react-feather";

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleUpdateUser = () => {
        navigate(`/users/${id}/update`, { state: { user } });
    };

    const mobileLayout = (
        <>
            <h1 className="text-bold ml-6 text-xl font-semibold text-primary-blue">Perfil de usuário</h1>
            <div className="m-4 mb-0 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 w-full">
                                <div className="flex flex-row items-center justify-between">
                                    <label className="ml-2 text-sm text-gray-500">Nome</label>
                                    <button
                                        className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary-red hover:bg-secondary-red/80"
                                        onClick={handleUpdateUser}
                                    >
                                        <Edit className="h-4 w-4 text-white" />
                                    </button>
                                </div>
                                <h2 className="ml-2 mt-[-6px]">{user.nome}</h2>
                                <Badge
                                    className={`flex w-20 items-center rounded-full bg-opacity-35 p-0 ${user.status ? "bg-[#8EC742] text-[#365B03] hover:bg-[#8EC742] hover:text-[#365B03]" : "bg-[#FB101E] text-[#790007] hover:bg-[#FB101E] hover:text-[#790007]"}`}
                                >
                                    <DotIcon className="h-6 w-6 p-0" />
                                    {user.status ? "Ativo" : "Inativo"}
                                </Badge>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 mt-2 flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">E-mail</label>
                                <span className="ml-2">{user.email}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">Setor</label>
                                <span className="ml-2">{user.setor}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">Está autorizado para revisar</label>
                                <span className="ml-2">{user.revisor ? "Sim" : "Não"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    if (isMobile) {
        return mobileLayout;
    }

    return (
        <>
            <h1 className="text-bold ml-8 text-xl font-semibold text-primary-blue">Perfil de usuário</h1>
            <div className="m-4 mb-0 ml-8 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 w-full">
                                <div className="flex flex-row items-center justify-between">
                                    <label className="ml-2 text-sm text-gray-500">Nome</label>
                                    <button
                                        className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary-red hover:bg-secondary-red/80"
                                        onClick={handleUpdateUser}
                                    >
                                        <Edit className="h-4 w-4 text-white" color="#FFF" />
                                    </button>
                                </div>
                                <h2 className="ml-2 mt-[-6px]">{user.nome}</h2>
                                <Badge
                                    className={`flex w-20 items-center rounded-full bg-opacity-35 p-0 ${user.status ? "hover:bg-#8EC742 hover:text-#365B03 bg-[#8EC742] text-[#365B03]" : "hover:bg-#FB101E hover:text-#790007 bg-[#FB101E] text-[#790007]"}`}
                                >
                                    {user.status ? (
                                        <DotIcon className="h-6 w-6 p-0" />
                                    ) : (
                                        <DotIcon className="h-6 w-6 p-0" />
                                    )}
                                    {user.status ? "Ativo" : "Inativo"}
                                </Badge>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 mt-2 flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">E-mail</label>
                                <span className="ml-2">{user.email}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">Setor</label>
                                <span className="ml-2">{user.setor}</span>
                            </div>
                            <div className="flex flex-col md:w-1/3">
                                <label className="ml-2 text-sm text-gray-500">Está autorizado para revisar</label>
                                <span className="ml-2">{user.revisor ? "Sim" : "Não"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
