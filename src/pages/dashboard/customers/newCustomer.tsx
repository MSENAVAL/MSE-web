import { useState, useEffect } from "react";
import UserIcon from "@/assets/user-icon.svg";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ModalDefault from "@/components/ModalDefault";
import { toast } from "react-toastify";
import { createCustomer } from "@/services/customers/customerService";
import { unMask } from "@/utils/masks";
import { cnpjValidator } from "@/helpers/validators";
import { cnpjMask } from "@/utils/masks";

const NewCustomer = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [office, setOffice] = useState("");
    const [representative, setRepresentative] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const setCnpjWithMask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCnpj(cnpjMask(e.target.value));
    };

    const validate = () => {
        const unMaskCnpj = unMask(cnpj);

        if (!cnpj) {
            toast.error("CNPJ é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        if (!cnpjValidator(unMaskCnpj)) {
            toast.error("CNPJ inválido", {
                position: "top-right",
            });
            return false;
        }

        if (!name) {
            toast.error("Nome da empresa é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        if (!representative) {
            toast.error("Nome do representante é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        if (!email) {
            toast.error("E-mail é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        if (!office) {
            toast.error("Cargo que ocupa é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        return true;
    };

    const handleCustomerRegister = async () => {
        if (!validate()) {
            handleCloseModal();
            return;
        }

        handleCloseModal();
        setLoading(true);

        const data = {
            id: 0,
            nome: name,
            cnpj: unMask(cnpj),
            email,
            nomeRepresentante: representative,
            cargo: office,
            status: true,
        };

        try {
            const response = await createCustomer(data);

            if (response.mensagem) {
                toast.success(response.mensagem, {
                    position: "top-right",
                });
                navigate("/customers");
            }
        } catch (error: Error | any) {
            console.log("error", error);
            toast.error(error.response.data, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileLayout = (
        <>
            <div className="m-4 flex flex-col items-center">
                <h1 className="text-bold text-xl font-semibold text-primary-blue">Cadastro de Cliente</h1>
                <div className="mt-4 flex w-full flex-col rounded-2xl bg-[#F7F7F7] p-4">
                    <label className="text-gray-500">CNPJ</label>
                    <Input
                        type="text"
                        placeholder="00.000.000/0000-00"
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={cnpj}
                        onChange={setCnpjWithMask}
                    />

                    <label className="text-gray-500">Nome da empresa</label>
                    <Input
                        type="text"
                        placeholder="Nome"
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="text-gray-500">Nome do representante</label>
                    <Input
                        type="text"
                        placeholder="Nome completo"
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={representative}
                        onChange={(e) => setRepresentative(e.target.value)}
                    />

                    <label className="text-gray-500">E-mail</label>
                    <Input
                        type="text"
                        placeholder="E-mail"
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="text-gray-500">Cargo que ocupa</label>
                    <Select value={office} onValueChange={setOffice}>
                        <SelectTrigger className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Diretor" className="cursor-pointer font-sans text-sm">
                                Diretor
                            </SelectItem>
                            <SelectItem value="Gerente" className="cursor-pointer font-sans text-sm">
                                Gerente
                            </SelectItem>
                            <SelectItem value="Coordenador" className="cursor-pointer font-sans text-sm">
                                Coordenador
                            </SelectItem>
                            <SelectItem value="Supervisor" className="cursor-pointer font-sans text-sm">
                                Supervisor
                            </SelectItem>
                            <SelectItem value="Analista" className="cursor-pointer font-sans text-sm">
                                Analista
                            </SelectItem>
                            <SelectItem value="Consultor" className="cursor-pointer font-sans text-sm">
                                Consultor
                            </SelectItem>
                            <SelectItem value="Vendedor" className="cursor-pointer font-sans text-sm">
                                Vendedor
                            </SelectItem>
                            <SelectItem value="Outro" className="cursor-pointer font-sans text-sm">
                                Outro
                            </SelectItem>
                        </SelectContent>
                    </Select>

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
                onConfirm={handleCustomerRegister}
                title="Você finalizou o cadastro do cliente?"
                mobile={true}
            />
        </>
    );

    if (isMobile) {
        return mobileLayout;
    }

    return (
        <>
            <h1 className="text-bold ml-16 text-xl font-semibold text-primary-blue">Cadastro de Cliente</h1>
            <div className="m-4 mb-0 ml-16 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">CNPJ</label>
                                <Input
                                    type="text"
                                    placeholder="00.000.000/0000-00"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={cnpj}
                                    onChange={setCnpjWithMask}
                                />
                            </div>
                            <div className="xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Nome da empresa</label>
                                <Input
                                    type="text"
                                    placeholder="Nome"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Nome do representante</label>
                                <Input
                                    type="text"
                                    placeholder="Nome completo"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={representative}
                                    onChange={(e) => setRepresentative(e.target.value)}
                                />
                            </div>
                            <div className="xl:w-1/3" />
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
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Cargo que ocupa</label>
                                <Select value={office} onValueChange={setOffice}>
                                    <SelectTrigger className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Diretor" className="cursor-pointer font-sans text-sm">
                                            Diretor
                                        </SelectItem>
                                        <SelectItem value="Gerente" className="cursor-pointer font-sans text-sm">
                                            Gerente
                                        </SelectItem>
                                        <SelectItem value="Coordenador" className="cursor-pointer font-sans text-sm">
                                            Coordenador
                                        </SelectItem>
                                        <SelectItem value="Supervisor" className="cursor-pointer font-sans text-sm">
                                            Supervisor
                                        </SelectItem>
                                        <SelectItem value="Analista" className="cursor-pointer font-sans text-sm">
                                            Analista
                                        </SelectItem>
                                        <SelectItem value="Consultor" className="cursor-pointer font-sans text-sm">
                                            Consultor
                                        </SelectItem>
                                        <SelectItem value="Vendedor" className="cursor-pointer font-sans text-sm">
                                            Vendedor
                                        </SelectItem>
                                        <SelectItem value="Outro" className="cursor-pointer font-sans text-sm">
                                            Outro
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="xl:w-1/3" />
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
                onConfirm={handleCustomerRegister}
                title="Você finalizou o cadastro do cliente?"
            />
        </>
    );
};

export default NewCustomer;
