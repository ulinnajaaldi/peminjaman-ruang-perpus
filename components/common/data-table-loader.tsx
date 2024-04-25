import { TableCell, TableRow } from "@/components/ui/table";

const DataTableLoader = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableCell key={index}>
              <div className="h-5 w-3/4 rounded bg-gray-100"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default DataTableLoader;
