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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export function ForgetPassword() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const submitRequest = async (data: any) =>{
        console.log(data);
        let { email, password, userName, confirmpassword} = data;

        if(password==confirmpassword){
            let res = await axios.post('http://localhost:3000/auth/signup', {
                email,
                userName,
                password
            })

            if(res){
                navigate('/');
            }
        };
    }

    return (
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
    )
}

export default ForgetPassword;