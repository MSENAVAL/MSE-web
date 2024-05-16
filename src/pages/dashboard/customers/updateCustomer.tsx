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
import { toast } from "react-toastify";
import { cnpjMask, unMask } from "@/utils/masks";
import { deleteCustomer, updateCustomer } from "@/services/customers/customerService";
import { cnpjValidator } from "@/helpers/validators";

const UpdateCustomer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const customer = location.state?.customer;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDeleteCustomer, setConfirmDeleteCustomer] = useState(false);

    const [name, setName] = useState(customer.nome);
    const [email, setEmail] = useState(customer.email);
    const [representative, setRepresentative] = useState(customer.nomeRepresentante);
    const [cnpj, setCnpj] = useState(cnpjMask(customer.cnpj));
    const [office, setOffice] = useState(customer.cargo);
    const [status, setStatus] = useState(customer.status);
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

        if (!office) {
            toast.error("Cargo que ocupa é obrigatório", {
                position: "top-right",
            });
            return false;
        }

        return true;
    };

    const handleUpdateCustomer = async () => {
        if (!validate()) {
            handleCloseModal();
            return;
        }

        setLoading(true);

        const data = {
            id: customer.id,
            nome: name,
            cnpj: unMask(cnpj),
            email,
            nomeRepresentante: representative,
            cargo: office,
            status,
        };

        try {
            const response = await updateCustomer(data);

            if (response) {
                toast.success("Cliente atualizado com sucesso!", {
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
            setIsModalOpen(false);
        }
    };

    const handleDeleteCustomer = async () => {
        setLoading(true);

        try {
            await deleteCustomer(customer.id);
            toast.success("Cliente removido com sucesso", {
                position: "top-right",
            });
        } catch (error: Error | any) {
            console.log("error", error);
            toast.error(error.response.data, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
            setConfirmDeleteCustomer(false);
            navigate("/customers");
        }
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileLayout = (
        <div className="m-4 flex flex-col items-center">
            <h1 className="text-bold text-xl font-semibold text-primary-blue">Perfil de Cliente</h1>
            <div className="mt-4 flex w-full flex-col rounded-2xl bg-[#F7F7F7] p-4">
                <label className="text-gray-500">Nome</label>
                <Input
                    type="text"
                    placeholder="Nome completo"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="text-gray-500">CNPJ</label>
                <Input
                    type="text"
                    placeholder="00.000.000/0000-00"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={cnpj}
                    onChange={setCnpjWithMask}
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

                <label className="text-gray-500">Nome do representante</label>
                <Input
                    type="text"
                    placeholder="Nome do representante"
                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                />

                <label className="text-gray-500">Cargo</label>
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

                <div className="relative">
                    <Input
                        type="text"
                        disabled
                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                        value={status ? "Cliente ativo" : "Cliente inativo"}
                    />
                    <Switch
                        className="absolute inset-y-3 right-2"
                        checked={status}
                        onCheckedChange={() => setStatus((prev: boolean) => !prev)}
                    />
                </div>

                <div className="mt-4 flex w-full flex-col items-center justify-center sm:flex-row">
                    <Button
                        className="mb-4 h-12 w-full rounded-full border border-secondary-red bg-white font-sans text-base font-bold text-primary hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => setConfirmDeleteCustomer(true)}
                    >
                        Excluir conta
                    </Button>

                    <Button
                        className="mb-4 h-12 w-full rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={() => navigate("/customers")}
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
                onConfirm={handleUpdateCustomer}
                title="Você finalizou a edição deste cliente?"
                mobile
            />

            <ModalDefault
                loading={loading}
                isOpen={confirmDeleteCustomer}
                onClose={() => setConfirmDeleteCustomer(false)}
                onConfirm={handleDeleteCustomer}
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
            <h1 className="text-bold ml-8 text-xl font-semibold text-primary-blue">Perfil de Cliente</h1>
            <div className="m-4 mb-0 ml-8 flex h-[95%] w-[95%] flex-col rounded-2xl sm:h-[90%] md:overflow-auto xl:mr-16">
                <div className="xs:h-[90%] col-span-4 mb-8 flex h-[90%] w-[90%] flex-col rounded-2xl bg-[#F7F7F7] pr-0 sm:h-[90%] md:overflow-auto lg:pr-0 xl:h-[80%] xl:pr-24">
                    <div className="flex w-full flex-col p-8">
                        <div className="mb-4 flex flex-row items-center">
                            <img src={UserIcon} alt="User Icon" className="h-16 w-16" />
                            <div className="ml-4 w-full">
                                <label className="ml-2 text-gray-500">Nome</label>
                                <Input
                                    type="text"
                                    placeholder="Nome da empresa"
                                    className="tex-bold mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Badge
                                    className={`flex w-20 items-center rounded-full bg-opacity-35 p-0 ${customer.status ? "hover:bg-#8EC742 hover:text-#365B03 bg-[#8EC742] text-[#365B03]" : "hover:bg-#FB101E hover:text-#790007 bg-[#FB101E] text-[#790007]"}`}
                                >
                                    {customer.status ? (
                                        <DotIcon className="h-6 w-6 p-0" />
                                    ) : (
                                        <DotIcon className="h-6 w-6 p-0" />
                                    )}
                                    {customer.status ? "Ativo" : "Inativo"}
                                </Badge>
                            </div>
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
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
                            <div className="md:ml-4 md:w-1/2 xl:ml-4 xl:w-1/3">
                                <label className="ml-2 text-gray-500">Nome do representante</label>
                                <Input
                                    type="text"
                                    placeholder="Nome do representante"
                                    className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                    value={representative}
                                    onChange={(e) => setRepresentative(e.target.value)}
                                />
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
                                <label className="ml-2 text-gray-500">Cargo</label>
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
                        </div>
                        <div className="mb-4 ml-20 flex flex-col md:flex-row md:items-center">
                            <div className="md:w-1/2 xl:w-1/3">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        disabled
                                        className="mb-4 mt-2 h-8 rounded-full bg-transparent px-4 font-sans text-sm"
                                        value={status ? "Cliente ativo" : "Cliente inativo"}
                                    />
                                    <Switch
                                        className="absolute inset-y-1 right-2"
                                        checked={status}
                                        onCheckedChange={() => setStatus((prev: boolean) => !prev)}
                                    />
                                </div>
                            </div>

                            <div className="xl:w-1/3" />
                            <div className="md:w-1/2 xl:w-1/3">
                                <Button
                                    className="mb-4 h-10 w-48 rounded-full bg-secondary-red font-sans text-base font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                                    onClick={() => setConfirmDeleteCustomer(true)}
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
                        onClick={() => navigate("/customers")}
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
                onConfirm={handleUpdateCustomer}
                title="Você finalizou a edição deste cliente?"
            />

            <ModalDefault
                loading={loading}
                isOpen={confirmDeleteCustomer}
                onConfirm={handleDeleteCustomer}
                onClose={() => setConfirmDeleteCustomer(false)}
                title="Tem certeza que deseja excluir essa conta?"
            />
        </>
    );
};

export default UpdateCustomer;
