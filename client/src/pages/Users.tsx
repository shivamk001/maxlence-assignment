import { DataTable } from "../components/users/data-table";
import { columns } from "../components/users/columns";
import type { UsersType } from "../components/users/columns";
import { NavBar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// type UsersType = {
//     id: string;
//     email: string;
//     role: string;
//     username: string;
// };

const Users = () => {
    // TODO: add entry functionality
    let [users, setUsers] = useState<UsersType[]>([]);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/auth/users/all`, {
            withCredentials: true,
            validateStatus: function (status) {
                // Accept all status codes; you can customize this
                return status >= 200 && status < 300 || status >= 400 && status < 500; // Accept all responses including 400
            }
        }).then((resp) => {
            if(resp.status === 401 || resp.status === 403) {
                toast.error(resp.data);
                return;
            }
            setUsers(resp.data);
        }).catch((err) => {
            debugger;
            console.error("Error fetching users:", err);
            setUsers([]);
            toast.error("Error fetching users. Please try again later.");
        })
    }, []);
    return (
        <>
            <NavBar/>
            <DataTable columns={columns} data={users}/>
        </>

    )
}

// export const users: UsersType[] = [
//     { id: "728ed52f", email: "e1@ex.com", role: "admin", username: "user1" },
//     { id: "8a6bc9f3", email: "e2@ex.com", role: "user", username: "user2" },
//     { id: "d4f7a120", email: "e3@ex.com", role: "user", username: "user3" },
//     { id: "b92f618a", email: "e4@ex.com", role: "admin", username: "user4" },
//     { id: "f1d308cb", email: "e5@ex.com", role: "user", username: "user5" },
//     { id: "c0a4521e", email: "e6@ex.com", role: "admin", username: "user6" },
//     { id: "a19be674", email: "e7@ex.com", role: "user", username: "user7" },
//     { id: "5f94cb38", email: "e8@ex.com", role: "user", username: "user8" },
//     { id: "7db16a45", email: "e9@ex.com", role: "user", username: "user9" },
//     { id: "109ac84e", email: "e10@ex.com", role: "admin", username: "user10" },
//     { id: "95d13020", email: "e11@ex.com", role: "user", username: "user11" },
//     { id: "3c58db75", email: "e12@ex.com", role: "user", username: "user12" },
//     { id: "4aef5b2c", email: "e13@ex.com", role: "admin", username: "user13" },
//     { id: "2bd167e1", email: "e14@ex.com", role: "user", username: "user14" },
//     { id: "7e68ca2d", email: "e15@ex.com", role: "user", username: "user15" },
//     { id: "fe1d93c7", email: "e16@ex.com", role: "admin", username: "user16" },
//     { id: "ca8341db", email: "e17@ex.com", role: "user", username: "user17" },
//     { id: "68ab7fd4", email: "e18@ex.com", role: "user", username: "user18" },
//     { id: "f39851da", email: "e19@ex.com", role: "user", username: "user19" },
//     { id: "ac0e7f12", email: "e20@ex.com", role: "admin", username: "user20" },
// ];

export default Users;