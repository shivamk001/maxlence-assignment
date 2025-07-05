import axios from 'axios';
import { useNavigate } from 'react-router';
import { Button } from "@/components/ui/button"
import {
    Card,
    // CardAction,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { toast } from "sonner"
import { useForm } from "react-hook-form";

export function SignUp() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const submitRequest = async (data: any) =>{
        console.log(data);
        let { email, password, userName, confirmpassword} = data;
        console.log(password, confirmpassword);
        if(password==confirmpassword){
            let res = await axios.post('http://localhost:3000/auth/signup', {
                email,
                userName,
                password
            })

            if(res){
                navigate('/');
            }
        }
        else{
            console.log('toast')
            // toast("Something's Wrong", {
            //     description: "Password and Confirm Password dont match",
            //     action: {
            //         label: "Ok",
            //         onClick: () => console.log("Ok"),
            //     },
            // })
            alert('Password and Confirm Password do not match')
        }
    }

    return (
        <div className="w-full h-full flex flex-row justify-center items-center">
            <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create New Account</CardTitle>
                <CardDescription>
                Enter your details below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit((data)=>submitRequest(data))}>
                <div className="flex flex-col gap-6">
                    {/* <div className="flex flex-row justify-center items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div> */}
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
                            <Label htmlFor="password">User Name</Label>
                        </div>
                        <Input 
                            {...register("userName")}
                            id="username" 
                            type="text" 
                            required />
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
                            Create Account
                        </Button>
                    </div>
                </div>
                </form>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                Create Account
                </Button>
            </CardFooter> */}
            </Card>
        </div>
    )
}

export default SignUp;