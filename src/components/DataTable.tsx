import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BaseRow {
    id: number;
}
interface DataTableProps<TData extends BaseRow, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    rowIcon?: string;
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function DataTable<TData extends BaseRow, TValue>({ columns, data, rowIcon }: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 9;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowClick = (user: TData) => {
        navigate(`/users/${user.id}`, { state: { user } });
    };

    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="flex w-full overflow-y-auto">
            <Table>
                <TableHeader className="border-b-3 border-black font-sans text-xs">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {rowIcon && <TableHead className="w-16"></TableHead>}
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="p-0">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <div className="mt-2 flex w-full" />
                <TableBody>
                    {paginatedData.length ? (
                        paginatedData.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                className={`cursor-pointer rounded-3xl border-none bg-white p-2 transition-colors hover:bg-primary-blue/10`}
                                onClick={() => handleRowClick(row)}
                            >
                                {rowIcon && (
                                    <TableCell className={`w-10 font-sans ${window.innerWidth <= 1366 ? "p-2" : ""}`}>
                                        <img src={rowIcon} alt="Ícone" className="h-6 w-6" />
                                    </TableCell>
                                )}
                                {table
                                    .getRowModel()
                                    .rows[rowIndex]?.getVisibleCells()
                                    .map((cell) => (
                                        <TableCell key={cell.id} className="p-0 font-sans text-xs">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + (rowIcon ? 1 : 0)}
                                className="h-24 text-center font-sans"
                            >
                                Nenhum dado encontrado
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="absolute bottom-[10%] flex items-center justify-center md:w-[50%] lg:w-[50%] xl:w-[60%]">
            <button
                className={`rounded py-1 pr-1 font-sans font-extrabold text-[#001D35] ${currentPage === 1 ? "text-[#D0D0D0]" : "text-[#001D35]"}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`mx-1 gap-1 py-1 font-sans ${page === currentPage ? "font-bold text-[#001D35]" : "text-[#D0D0D0]"}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={`rounded py-1 pl-1 font-sans font-extrabold text-[#001D35] ${currentPage === totalPages ? "text-[#D0D0D0]" : "text-[#001D35]"}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {">"}
            </button>
        </div>
    );
};
