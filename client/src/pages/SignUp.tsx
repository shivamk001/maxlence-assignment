import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { Button } from "@/components/ui/button"
import {
    Card,
    // CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

// type FormData = {
//     email: string;
//     username: string;
//     password: string;
//     file: FileList; // for file input, use FileList type
// };

export function SignUp() {
    const {register, handleSubmit, watch} = useForm();
    const navigate = useNavigate();
    const [profileLink, setProfileLink] = useState('https://cdn-icons-png.flaticon.com/128/12225/12225881.png');
    const [isLoading, setisLoading] = useState(false);
    const imageFile=watch('profile');
    console.log(imageFile && imageFile.length>0 ? imageFile[0].name : 'abc');

    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('API URL:', apiUrl);


    useEffect(()=>{
        if(imageFile && imageFile.length>0){
            const file=imageFile[0];
            const objectUrl=URL.createObjectURL(file);
            setProfileLink(objectUrl);
        }   
    }, [imageFile])

    const submitRequest = async (data: any) =>{
        setisLoading(true);
        console.log(data);
        let { email, password, userName, confirmpassword} = data;
        console.log(password, confirmpassword);
        if(password==confirmpassword){

            let formData = new FormData();
            formData.append('email', email);
            formData.append('userName', userName);
            formData.append('password', password);

            let res = await axios.post(
                `${apiUrl}/auth/signup`,
                formData,
                {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                    validateStatus: function (status) {
                    // Accept all status codes; you can customize this
                    return status >= 200 && status < 300 || status === 401 || status === 422;
                    },
                }
                );

            if(res.status==201){
                navigate('/');
            }
            else{
                setisLoading(false);
                toast.error(res.data);
                navigate('/signup');
            }
        }
        else{
            setisLoading(false);
            toast.error(`Passwords and Confirm Passwords don't match`);
        }
    }

    return (
        <>
            {isLoading ? 
                <div className="w-full h-full flex flex-row justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
            :
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
                        <div className="flex justify-center">
                            <Avatar className="w-16 h-16">
                                <AvatarImage
                                    src={profileLink}
                                    alt="@evilrabbit"
                                    className="rounded-full"
                                />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="profile">Profile Picture</Label>
                            <Input
                                {...register("profile")}
                                id="profile"
                                type="file"
                                accept='image/*'
                                required
                            />
                        </div>
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
                <CardFooter className="flex-col">
                    <Button variant="link"><Link to='/signin'>Sign In</Link></Button>
                </CardFooter>
            </Card>
            </div>}
            <ToastContainer />
        </>
    )
}

export default SignUp;