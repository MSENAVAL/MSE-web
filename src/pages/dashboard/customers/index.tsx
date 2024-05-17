import { DataTable } from "@/components/DataTable";
import { userColumns } from "../_tables/userColumns";
import { listCustomers } from "@/services/customers/customerService";
import { Customer } from "@/interfaces/customer";
import UserIcon from "@/assets/user-icon.svg";
import { DotIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SkeletonDataTable } from "@/components/SkeletonDataTable";
import { customerColumns } from "../_tables/customerColumns";

const Customers = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedUser, setSelectedCustomer] = useState<Customer | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoading(true);
            const customers: Customer[] = await listCustomers();

            if (customers) setCustomers(customers);

            setIsLoading(false);
        };

        if (customers.length === 0) fetchCustomers();
    }, []);

    const handleNewCustomer = () => {
        navigate("register");
    };

    const handleRowClick = (customer: Customer) => {
        setSelectedCustomer(customer);
        navigate(`/customers/${customer.id}`, { state: { customer } });
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1100);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileTable = (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <h3 className="text-bold mb-4 items-center text-lg font-semibold text-primary-blue">
                    Clientes Cadastrados
                </h3>
                <div className="mb-4 flex items-center justify-end">
                    <Button
                        className="h-8 w-32 rounded-full bg-secondary-red font-sans text-xs font-bold shadow-md hover:bg-secondary-red/80"
                        onClick={handleNewCustomer}
                    >
                        <PlusIcon className="mr-1 h-5 w-5" />
                        Novo cadastro
                    </Button>
                </div>
            </div>
            <div className="overflow-auto">
                {customers.map((customer) => (
                    <div
                        key={customer.id}
                        className="mb-4 flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 font-sans shadow-md transition-colors hover:bg-gray-100"
                        onClick={() => handleRowClick(customer)}
                    >
                        <div className="font-sans">
                            <p className="font-semibold">{customer.nome}</p>
                            <p className="text-gray-600">{customer.cnpj}</p>
                            <p className="text-gray-600">{customer.email}</p>
                        </div>
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
                ))}
            </div>
        </div>
    );

    if (isMobile) {
        return mobileTable;
    }

    return (
        <>
            <h1 className="text-bold ml-8 text-xl font-semibold text-primary-blue">Clientes cadastrados</h1>

            <div className="m-4 grid h-[95%] grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
                <div className="col-span-3 m-4 mb-8 flex h-[90%] w-full flex-col rounded-2xl bg-[#F7F7F7]">
                    <div className="m-2 mx-8 mb-0 flex items-center justify-end lg:mt-8 xl:mt-8">
                        <Button
                            className="h-10 w-36 rounded-full bg-secondary-red font-sans text-xs font-bold shadow-md hover:bg-secondary-red/80"
                            onClick={handleNewCustomer}
                        >
                            <PlusIcon className="mr-1 h-5 w-5" />
                            Novo cadastro
                        </Button>
                    </div>
                    <div className="flex items-center justify-center px-8 pb-8">
                        <div className="w-full">
                            {isLoading ? (
                                <SkeletonDataTable />
                            ) : (
                                <DataTable
                                    columns={customerColumns}
                                    data={customers}
                                    rowIcon={UserIcon}
                                    handleRowClick={handleRowClick}
                                />
                            )}
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

export default Customers;
