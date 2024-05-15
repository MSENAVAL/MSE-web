import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface ModalDefaultProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    mobile?: boolean;
}

const ModalDefault = ({ isOpen, onClose, title, description = "", mobile = false }: ModalDefaultProps) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                {/* Botão fechar à direita*/}
                <button className="absolute right-4 top-4 rounded-full border border-[#001D35] p-1" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 hover:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <AlertDialogHeader className="mt-4">
                    <AlertDialogTitle className="mt-6 text-center font-sans">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="font-sans">{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <div className={`mt-6 flex w-full items-center justify-center ${mobile && "gap-4"}`}>
                    <Button
                        className="h-8 w-24 rounded-full border border-secondary-red bg-white font-sans text-xs font-bold text-secondary-red hover:bg-secondary-red/30 sm:mb-0 md:mr-4"
                        onClick={onClose}
                        variant={"secondary"}
                    >
                        Não
                    </Button>
                    <Button
                        className="h-8 w-24 rounded-full bg-secondary-red font-sans text-xs font-bold hover:bg-secondary-red/80 sm:mb-0 md:mr-4"
                        onClick={onClose}
                    >
                        Sim
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalDefault;
