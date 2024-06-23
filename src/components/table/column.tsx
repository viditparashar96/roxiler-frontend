import { ColumnDef } from "@tanstack/react-table";
import { FormatDate } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export type Transaction = {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold: boolean;
  dateOfSale: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.image}
          alt={row.original.title}
          className="w-[40px] aspect-auto"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0.1}>
            <TooltipTrigger asChild>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                {row.original.title}
              </p>
            </TooltipTrigger>
            <TooltipContent>{row.original.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <p>Rs.{row.original.price.toFixed(2)}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0.1}>
            <TooltipTrigger asChild>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                {row.original.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="w-[400px]">
              {" "}
              {row.original.description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "sold",
    header: "Status",
    cell: ({ row }) => {
      return (
        <p
          className={`px-2 py-1 text-xs font-semibold w-fit rounded-full ${
            row.original.sold
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {row.original.sold ? "Sold" : "Available"}
        </p>
      );
    },
  },
  {
    accessorKey: "dateOfSale",
    header: "Date of Sale",
    cell: ({ row }) => {
      return <p>{FormatDate(row.original.dateOfSale)}</p>;
    },
  },
];
