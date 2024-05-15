import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDataTable() {
    return (
        <div className="flex w-full overflow-y-auto">
            <Table>
                <TableHeader className="border-b-3 border-black font-sans text-xs">
                    <TableRow>
                        <TableHead className="w-16"></TableHead>
                        <TableHead className="p-0">
                            <Skeleton className="h-8 w-24" />
                        </TableHead>
                        <TableHead className="p-0">
                            <Skeleton className="h-8 w-24" />
                        </TableHead>
                        <TableHead className="p-0">
                            <Skeleton className="h-8 w-24" />
                        </TableHead>
                        <TableHead className="p-0">
                            <Skeleton className="h-8 w-24" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <div className="mt-2 flex w-full" />
                <TableBody>
                    {[...Array(5)].map((_, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            className={`rounded-3xl border-none bg-white p-2 transition-colors hover:bg-primary-blue/10`}
                        >
                            {[...Array(5)].map((_, cellIndex) => (
                                <TableCell
                                    key={cellIndex}
                                    className={`w-10 font-sans ${window.innerWidth <= 1366 ? "p-2" : ""}`}
                                >
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="absolute bottom-[10%] flex items-center justify-center md:w-[50%] lg:w-[50%] xl:w-[60%]">
                {[...Array(5)].map((_, index) => (
                    <button key={index} className="mx-1 gap-1 py-1 font-sans text-[#D0D0D0]">
                        <Skeleton className="h-8 w-8" />
                    </button>
                ))}
            </div>
        </div>
    );
}
