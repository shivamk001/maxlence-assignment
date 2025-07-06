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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export function ForgetPassword() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);

    const submitRequest = async (data: any) =>{
        console.log(data);
        let { email, password, userName, confirmpassword} = data;
        setisLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log('API URL:', apiUrl);

        if(password==confirmpassword){
            let res = await axios.post(`${apiUrl}/auth/reset-mail`, {
                email,
                userName,
                password
            })

            if(res.status==200){
                setisLoading(false);
                
            }
        };
    }

    return isLoading ?
            <div className="w-full h-full flex flex-row justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
        :
        <div className="w-full h-full flex flex-row justify-center items-center">
            <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Forget Password</CardTitle>
                <CardDescription>
                Enter Email
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit((data)=>{submitRequest(data)})}>
                <CardContent>
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
                    </div>
                    <div className="flex-col gap-2 mt-6">
                        <Button type="submit" className="w-full">
                            Send Reset Password Link to Email
                        </Button>
                    </div>
                </CardContent>
            </form>
            {/* <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Send Reset Password Link to Email
                    </Button>
            </CardFooter> */}
            </Card>      
        </div>
}

export default ForgetPassword;