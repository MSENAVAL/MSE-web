import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IButtonLoadingProps {
    className?: string;
    title?: string;
}

const ButtonLoading = ({
    className,
    title = "Por favor, aguarde...",
}: IButtonLoadingProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Button disabled className={className}>
            <Loader2 className={`mr-2 h-4 w-4 animate-spin`} />
            {title}
        </Button>
    );
};

export default ButtonLoading;
