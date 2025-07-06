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
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect, useState } from 'react';
import { NavBar } from '@/components/Navbar';

const Profile = () => {
    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const [profileLink, setProfileLink] = useState('https://cdn-icons-png.flaticon.com/128/12225/12225881.png');
    const imageFile = watch('profile');
    console.log(imageFile && imageFile.length > 0 ? imageFile[0].name : 'abc');

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const objectUrl = URL.createObjectURL(file);
            setProfileLink(objectUrl);
        }
    }, [imageFile])

    const submitRequest = async (data: any) => {
        console.log(data);
        let { email, password, userName, confirmpassword } = data;
        console.log(password, confirmpassword);
        if (password == confirmpassword) {

            let formData = new FormData();
            formData.append('email', email);
            formData.append('userName', userName);
            formData.append('password', password);
            formData.append('image', data.file[0]);

            let res = await axios.post('http://localhost:3000/auth/signup', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // https://cdn-icons-png.flaticon.com/128/12225/12225881.png

            if (res) {
                navigate('/');
            }
        }
        else {
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
        <>
            <NavBar/>
            <div className="w-full h-full flex flex-row justify-center items-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader className='text-center'>
                        <CardTitle>Edit Your Account</CardTitle>
                        <CardDescription>
                            Enter your details below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className='w-full grid gap-4' onSubmit={handleSubmit((data) => submitRequest(data))}>
                            <div className="flex flex-row gap-6">
                                <div className='w-1/3 flex flex-col gap-4 justify-center items-center'>
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
                                </div>

                                <div className='w-2/3 flex flex-col gap-4'>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            {...register("email")}
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Role</Label>
                                        <Input
                                            {...register("email")}
                                            id="role"
                                            type="role"
                                            placeholder="User"
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="grid gap-2 mb-2">
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
                                </div>
                            </div>
                            <div className="flex-col gap-2">
                                <Button type="submit" className="w-full">
                                        Create Account
                                </Button>
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
        </>

    )
}

export default Profile