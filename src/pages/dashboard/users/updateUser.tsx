import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DotIcon, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import UserIcon from "@/assets/user-icon.svg";
import { Badge } from "@/components/ui/badge";
import ModalDefault from "@/components/ModalDefault";
import { deleteUser, updateUser } from "@/services/users/userService";
import { toast } from "react-toastify";

const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const user = location.state?.user;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);

    const [name, setName] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [sector, setSector] = useState(user.setor);
    const [status, setStatus] = useState(user.status);
    const [reviewer, setReviewer] = useState(user.revisor);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const validate = () => {
        if (!name) {
            toast.error("Nome da empresa é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        if (!sector) {
            toast.error("Setor é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        return true;
    };

    const handleUpdateUser = async () => {
        if (!validate()) {
            handleCloseModal();
            return;
        }

        setLoading(true);

        const data = {
            id: user.id,
            nome: name,
            email,
            setor: sector,
            revisor: reviewer === "sim" || true ? true : false,
            // senha: password || undefined,
            // confirmarSenha: confirmPassword || undefined,
            status,
        };

        try {
            const response = await updateUser(data);
            if (response) {
                toast.success("Usuário atualizado com sucesso!", {
                    position: "top-right",
                });
                navigate("/users");
            }
        } catch (error: Error | any) {
            console.log("error", error);
            toast.error(error.response.data, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    const handleDeleteUser = async () => {
        setLoading(true);

        try {
            await deleteUser(user.id);
            toast.success("Usuário removido com sucesso", {
                position: "top-right",
            });
        } catch (error: Error | any) {
            console.log("error", error);
            toast.error(error.response.data, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
            setConfirmDeleteUser(false);
            navigate("/users");
        }
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileLayout = (
        <div className="m-4 flex flex-col items-center">
            <h1 className="text-bold text-xl font-semibold text-primary-blue">Perfil de Usuário</h1>
            <div className="mt-4 flex w-full flex-col rounded-2xl bg-[#F7F7F7] p-4">
                <label className="text-gray-500">Nome</label>
                <Input
                    type="text"
                    placeholder="Nome completo"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="text-gray-500">E-mail</label>
                <Input
                    type="text"
                    placeholder="E-mail"
                    disabled
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="text-gray-500">Setor</label>
                <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Diretoria" className="cursor-pointer font-sans text-sm">
                            Diretoria
                        </SelectItem>
                        <SelectItem value="Engenharia" className="cursor-pointer font-sans text-sm">
                            Engenharia
                        </SelectItem>
                        <SelectItem value="Operacional" className="cursor-pointer font-sans text-sm">
                            Operacional
                        </SelectItem>
                    </SelectContent>
                </Select>

                <label className="text-gray-500">Está autorizado para revisar</label>
                <Select value={reviewer ? "sim" : "nao"} onValueChange={setReviewer}>
                    <SelectTrigger className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sim" className="cursor-pointer font-sans text-sm">
                            Sim
                        </SelectItem>
                        <SelectItem value="nao" className="cursor-pointer font-sans text-sm">
                            Não
                        </SelectItem>
                    </SelectContent>
                </Select>

                <div className="relative">
                    <Input
                        type="text"
                        disabled
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={status ? "Usuário ativo" : "Usuário inativo"}
                    />
                    <Switch
                        className="absolute inset-y-3 right-2"
                        checked={status}
                        onCheckedChange={() => setStatus((prev: boolean) => !prev)}
                    />
                </div>

                {/* <label className="text-gray-500">Senha</label>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-2 flex h-full w-10 items-center justify-center text-gray-500"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                <label className="text-gray-500">Confirmação de senha</label>
                <div className="relative">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="*********"
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-2 flex h-full w-10 items-center justify-center text-gray-500"
                    >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div> */}

                <div className="mt-4 flex w-full flex-col items-center justify-center sm:flex-row">
                    <Button
                        className="mb-4 h-12 w-full rounded-full border border-secondary-red bg-white font-sans text-base font-bold text-primary hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => setConfirmDeleteUser(true)}
                    >
                        Excluir conta
                    </Button>

                    <Button
                        className="mb-4 h-12 w-full rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => navigate("/users")}
                    >
                        Cancelar
                    </Button>

                    {loading ? (
                        <ButtonLoading className="h-12 w-full rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80" />
                    ) : (
                        <Button
                            className="h-12 w-full rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80"
                            onClick={handleOpenModal}
                        >
                            Confirmar
                        </Button>
                    )}
                </div>
            </div>

            <ModalDefault
                loading={loading}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleUpdateUser}
                title="Você finalizou a edição deste usuário?"
                mobile
            />

            <ModalDefault
                loading={loading}
                isOpen={confirmDeleteUser}
                onClose={() => setConfirmDeleteUser(false)}
                onConfirm={handleDeleteUser}
                title="Tem certeza que deseja excluir essa conta?"
                mobile
            />
        </div>
    );

    if (isMobile) {
        return mobileLayout;
    }

    return (
        <>
            <h1 className="text-bold ml-8 text-xl font-semibold text-primary-blue">Perfil de Usuário</h1>
            <div className="m-4 mb-0 ml-8 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 w-full">
                                <label className="ml-2 text-gray-500">Nome</label>
                                <Input
                                    type="text"
                                    placeholder="Nome completo"
                                    className="tex-bold mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
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
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">E-mail</label>
                                <Input
                                    type="text"
                                    placeholder="E-mail"
                                    disabled
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="xl:w-1/3" />
                            <div className="md:ml-4 md:w-1/2 xl:ml-4 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Setor</label>
                                <Select value={sector} onValueChange={setSector}>
                                    <SelectTrigger className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Diretoria" className="cursor-pointer font-sans text-sm">
                                            Diretoria
                                        </SelectItem>
                                        <SelectItem value="Engenharia" className="cursor-pointer font-sans text-sm">
                                            Engenharia
                                        </SelectItem>
                                        <SelectItem value="Operacional" className="cursor-pointer font-sans text-sm">
                                            Operacional
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Está autorizado para revisar</label>
                                <Select value={reviewer ? "sim" : "nao"} onValueChange={setReviewer}>
                                    <SelectTrigger className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sim" className="cursor-pointer font-sans text-sm">
                                            Sim
                                        </SelectItem>
                                        <SelectItem value="nao" className="cursor-pointer font-sans text-sm">
                                            Não
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        disabled
                                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                        value={status ? "Usuário ativo" : "Usuário inativo"}
                                    />
                                    <Switch
                                        className="absolute inset-y-1 right-2"
                                        checked={status}
                                        onCheckedChange={() => setStatus((prev: boolean) => !prev)}
                                    />
                                </div>
                            </div>
                            {/* <div className="md:ml-4 md:w-1/2 xl:ml-4 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Senha</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="*********"
                                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-2 flex h-full w-10 items-center justify-center text-gray-500"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div> */}
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            {/* <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Confirmação de senha</label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="*********"
                                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-2 flex h-full w-10 items-center justify-center text-gray-500"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="xl:w-1/3" /> */}
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="xl:w-1/3" />
                            <div className="xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <Button
                                    className="mb-4 h-10 w-48 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                                    onClick={() => setConfirmDeleteUser(true)}
                                >
                                    Excluir conta
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-4 flex w-[90%] flex-col items-center justify-center sm:flex-row xl:mr-16">
                    <Button
                        className="mb-4 h-12 w-48 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => navigate("/users")}
                    >
                        Cancelar
                    </Button>

                    {loading ? (
                        <ButtonLoading className="h-12 w-48 rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80" />
                    ) : (
                        <Button
                            className=" h-12 w-48 rounded-full bg-primary-blue font-sans text-base font-bold hover:bg-primary-blue/80 "
                            onClick={handleOpenModal}
                        >
                            Confirmar
                        </Button>
                    )}
                </div>
            </div>

            <ModalDefault
                loading={loading}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleUpdateUser}
                title="Você finalizou a edição deste usuário?"
            />

            <ModalDefault
                loading={loading}
                isOpen={confirmDeleteUser}
                onConfirm={handleDeleteUser}
                onClose={() => setConfirmDeleteUser(false)}
                title="Tem certeza que deseja excluir essa conta?"
            />
        </>
    );
};

export default UpdateUser;
