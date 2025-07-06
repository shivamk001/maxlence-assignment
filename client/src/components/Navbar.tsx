
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export function NavBar() {
    return (
        <div className="w-full bg-gray-900 text-white px-6 py-4 shadow flex items-center justify-between">
            {/* Left: Logo + Links */}
            <div className="flex items-center gap-8">
                <h1 className="text-xl font-semibold">Foo</h1>
                <nav className="flex gap-4">
                {/* <a href="#" className="hover:underline">Home</a> */}
                <Link to='/users'>Users</Link>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
                {/* <a href="#" className="hover:underline">About</a> */}
                {/* <a href="#" className="hover:underline">Contact</a> */}
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
    )
}
