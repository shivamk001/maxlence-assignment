import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";

export function ForgetPassword() {
    const {register, handleSubmit} = useForm();

    let sendRequest = (data: any)=>{
        
    }

    return (
        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription>
            Enter Email
            </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit((data)=>{sendRequest(data)})}>
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
    )
}

export default ForgetPassword;