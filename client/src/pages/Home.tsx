import { DataTable } from "../components/payments/data-table";
import { columns } from "../components/payments/columns";
import type { Payment } from "../components/payments/columns";
import { NavBar } from "@/components/Navbar";

const Home = () => {
    // TODO: add entry functionality
    return (
        <>
            <NavBar/>
            <DataTable columns={columns} data={payments}/>
        </>

    )
}

export const payments: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example1@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example2@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example3@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example4@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example5@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example6@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example7@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example8@gmail.com",
    },
        {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example9@gmail.com",
    },
]

export default Home