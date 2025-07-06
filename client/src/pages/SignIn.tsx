import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

export function SignIn() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);

    const submitRequest = async (data: any) =>{
        console.log(data);
        let { email, password} = data;
        setisLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log('API URL:', apiUrl);


        let res = await axios.post(`${apiUrl}/auth/signin`, {
            email,
            password
        },{
            withCredentials: true,
            validateStatus: function (status) {
                // Accept all responses including 401
                return status >= 200 && status < 300 || status === 401;
            },
        });

        if(res.status==200){
            setisLoading(false);
            navigate('/');
            toast.success("Login Successful!", {
                position: "top-right",
            });
        }
        else{
            console.log('Res:', res);
            setisLoading(false);
            navigate('/signin');
            toast.error(res.data);
        }
    }

    return (<>
        {isLoading ?
            <div className="w-full h-full flex flex-row justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
        :
        <div className="w-full h-full flex flex-row justify-center items-center">
            <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                <Button variant="link"><Link to='/signup'>Sign Up</Link></Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit((data)=>submitRequest(data))}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                        </div>
                        <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                            Forgot your password?
                            </a>
                        </div>
                        <Input 
                            {...register("password")}
                            id="password" 
                            type="password" 
                            required />
                        </div>
                    </div>
                    <div className="flex-col gap-2 mt-6">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {/* <Button type="submit" className="w-full">
                Login
                </Button> */}
                {/* <Button variant="outline" className="w-full">
                Login with Google
                </Button> */}
            </CardFooter>
            </Card>
        </div>}
        <ToastContainer />
        </>)
}

export default SignIn;