import { DataTable } from "../components/payments/data-table";
import { columns } from "../components/payments/columns";
import type { Payment } from "../components/payments/columns";
import { NavBar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

type CurrenUser = {
    id: string
    email: string
}

const Home = () => {
    // TODO: add entry functionality
    const navigate=useNavigate();
    const [currentUser, setCurrentUser] = useState<CurrenUser | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('API URL:', apiUrl);

        useEffect(() => {
            axios
            .get(`${apiUrl}/auth/currentuser`, {
                withCredentials: true,
            })
            .then((resp) => {
                console.log("CURRENT USER", resp.data)
                setCurrentUser({
                email: resp.data.email,
                id: resp.data.id,
                })
            })
            .catch((err) => {
                console.error("Error fetching current user:", err)
                setCurrentUser(null);
                navigate('/signin');
            })
        }, []);
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