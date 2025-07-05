import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { DataTable } from "./payments/data-table";
import { columns } from "./payments/columns";

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const Home = () => {
    return (
        <>
            <div className="w-full bg-gray-900 text-white px-6 py-4 shadow flex items-center justify-between">
                {/* Left: Logo + Links */}
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-semibold">Foo</h1>
                    <nav className="flex gap-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Contact</a>
                    </nav>
                </div>

                {/* Right: Login/Logout Buttons */}
                <div className="flex gap-4">
                    <Button asChild>
                        <Link to="/login">Login</Link>
                    </Button>

                    <Button asChild>
                        <Link to="/login">Login</Link>
                    </Button>

                </div>
            </div>
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