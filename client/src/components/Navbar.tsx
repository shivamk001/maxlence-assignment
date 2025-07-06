import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

type CurrenUser = {
    id: string
    email: string
}

export function NavBar() {
    const [currentUser, setCurrentUser] = useState<CurrenUser | null>(null);
    let navigate=useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL
    console.log("API URL:", apiUrl)

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
        })
    }, [])

    const signout = async () => {
        console.log("SIGNOUT")
        await axios.get(`${apiUrl}/auth/signout`, {
        withCredentials: true,
        })
        setCurrentUser(null);
        navigate('/signin');
        toast.success("Logout Successful!", {
            position: "top-right",
        });
    }

    return (
        <>
            <div className="w-full bg-gray-900 text-white px-6 py-4 shadow flex items-center justify-between">
                {/* Left: Logo + Links */}
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-semibold">Foo</h1>
                    <nav className="flex gap-4">
                    <Link to="/users">Users</Link>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    </nav>
                </div>

                {/* Right: Login/Logout Buttons */}
                <div className="flex gap-4">
                    {currentUser && currentUser.id && currentUser.email ? (
                    <Button onClick={signout}>Signout</Button>
                    ) : (
                    <Button asChild>
                        <Link to="/signin">Login</Link>
                    </Button>
                    )}
                </div>
            </div>
            <ToastContainer />  
        </>

    )
}
