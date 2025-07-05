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
import { useForm } from "react-hook-form";

export function SignUp() {
    const {register, handleSubmit} = useForm();

    const submitRequest = (data: any) =>{
        console.log(data);
    }

    return (
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
    )
}

export default SignUp;