import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

export function ResetPassword() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [userJson, setuserJson] = useState<{email: string, id: string} | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('API URL:', apiUrl);

    const [searchParams] = useSearchParams();
    let token = searchParams.get('token');


    useEffect(()=>{

        // @ts-ignore
        // const decodedStr = Buffer.from(token, 'base64').toString('utf-8');
        console.log('token:', atob(token));
        // @ts-ignore
        let json=JSON.parse(atob(token));
        setuserJson(json);
    }, []);


    const submitRequest = async (data: any) =>{
        console.log(data);
        setisLoading(true);
        let { password, confirmpassword} = data;
        debugger;
        if(password==confirmpassword){
            let res = await axios.post(`${apiUrl}/auth/reset?token=${token}`, {
                password
            }, {
                validateStatus: function (status) {
                return status >= 200 && status < 300 || status >= 400 && status < 500; // Accept all responses including 400
            }
        });

            if(res.status==200){
                debugger;
                setisLoading(false);
                toast.success("Password Reset Successfully!");
                navigate('/signin');
            }
            else{
                toast.error(res.data);
                setisLoading(false);
                navigate('/resetpassword');
            }
        }
        else{
            setisLoading(false);
            toast.error(`Passwords and Confirm Passwords don't match`);
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
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                Enter New Password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit((data)=>submitRequest(data))}>
                <div className="flex flex-col gap-6">

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            // {...register("email")}
                            id="email"
                            type="email"
                            // placeholder="m@example.com"
                            defaultValue={userJson?userJson.email:''}
                            required
                            readOnly
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input 
                            {...register("password")}
                            id="password" 
                            type="password" 
                            required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Confirm Password</Label>
                        </div>
                        <Input 
                            {...register("confirmpassword")}
                            id="confirmpassword" 
                            type="password" 
                            required />
                    </div>
                    <div className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </div>
                </div>
                </form>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Reset Password
                </Button>
            </CardFooter> */}
            </Card>
        </div>}
        <ToastContainer />
    </>)
}

export default ResetPassword;