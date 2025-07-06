

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react";
import { Trash2 } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type UsersType = {
    id: string
    username: string
    email : string
    role: "user" | "admin"
}

export const columns: ColumnDef<UsersType>[] = [
    {
        accessorKey: "username",
        header: "Username"
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
        }
    },
    {
        id: "delete",
        cell: ({ row }) => {
        const user = row.original
    
        return (
            <Button onClick={() => alert('Delete clicked')}>
                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
            </Button>
        )
        },
    },
];