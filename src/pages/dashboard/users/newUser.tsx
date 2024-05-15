import { useState, useEffect } from "react";
import UserIcon from "@/assets/user-icon.svg";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ModalDefault from "@/components/ModalDefault";

const NewUser = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [sector, setSector] = useState("");
    const [reviewer, setReviewer] = useState("");
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

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileLayout = (
        <>
            <div className="m-4 flex flex-col items-center">
                <h1 className="text-bold text-xl font-semibold text-primary-blue">Usuários cadastrados</h1>
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
                            <SelectItem value="diretoria" className="cursor-pointer font-sans text-sm">
                                Diretoria
                            </SelectItem>
                            <SelectItem value="engenharia" className="cursor-pointer font-sans text-sm">
                                Engenharia
                            </SelectItem>
                            <SelectItem value="operacional" className="cursor-pointer font-sans text-sm">
                                Operacional
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <label className="text-gray-500">Está autorizado para revisar</label>
                    <Select value={reviewer} onValueChange={setReviewer}>
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

                    <label className="text-gray-500">Senha</label>
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
                    </div>

                    <div className="mt-4 flex w-full flex-col items-center justify-center sm:flex-row">
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
                                Cadastrar
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <ModalDefault
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Você finalizou o cadastro do usuário?"
                mobile={true}
            />
        </>
    );

    if (isMobile) {
        return mobileLayout;
    }

    return (
        <>
            <h1 className="text-bold ml-16 text-xl font-semibold text-primary-blue">Usuários cadastrados</h1>
            <div className="m-4 mb-0 ml-16 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 w-full">
                                <label className="ml-2 text-gray-500">Nome</label>
                                <Input
                                    type="text"
                                    placeholder="Nome completo"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">E-mail</label>
                                <Input
                                    type="text"
                                    placeholder="E-mail"
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
                                        <SelectItem value="diretoria" className="cursor-pointer font-sans text-sm">
                                            Diretoria
                                        </SelectItem>
                                        <SelectItem value="engenharia" className="cursor-pointer font-sans text-sm">
                                            Engenharia
                                        </SelectItem>
                                        <SelectItem value="operacional" className="cursor-pointer font-sans text-sm">
                                            Operacional
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Está autorizado para revisar</label>
                                <Select value={reviewer} onValueChange={setReviewer}>
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
                            <div className="md:ml-4 md:w-1/2 xl:ml-4 xl:w-1/3">
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
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
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
                            Cadastrar
                        </Button>
                    )}
                </div>
            </div>

            <ModalDefault
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Você finalizou o cadastro do usuário?"
            />
        </>
    );
};

export default NewUser;
