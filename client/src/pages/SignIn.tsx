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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export function SignIn() {
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
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                <Button variant="link">Sign Up</Button>
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
        </div>
    )
}

export default SignIn;