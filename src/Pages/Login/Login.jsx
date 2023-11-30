import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import {  useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Lottie from "lottie-react";
import Swal from 'sweetalert2';

import animation from '../../assets/Login/loginAnimation.json'
import { Helmet } from "react-helmet-async";
import Social_Login from "../../Shared-Compo/Social_Login";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@material-tailwind/react";


const Login = () => {
    let [showPassword, setShowPassword] = useState(false);
    let { SignInUser } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/'

    let handleLogin = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        SignInUser(email, password)
            .then(result => {
                // console.log(result.user);
                e.target.reset();
                Swal.fire({
                    title: 'Success!',
                    text: `Welcome Back ${result.user?.displayName}`,
                    icon: 'Success',
                    confirmButtonText: 'Cool'
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                })
            })
    }


    return (
        <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-5 px-4 mt-5">
            <Helmet>
                <title>Milon Mela | Login</title>
            </Helmet>
            <div className="bg-gray-400 w-full md:w-4/12 md:pr-10 text-center p-10 rounded-lg">
                <h2 className="text-3xl font-bold">Login Now!</h2>
                <form onSubmit={handleLogin}>
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">User Email</p>
                        <AiOutlineMail className="absolute bottom-4 left-2"></AiOutlineMail>
                        <input className="w-full p-2 pl-7 text-black rounded-lg my-1"
                            type="email"
                            name="email"
                            placeholder="Type your email"
                            required />
                    </div>
                    <hr className="my-3" />
                    <div className="relative">
                        <p className="text-left text-lg font-semibold">Password</p>
                        <RiLockPasswordFill className="absolute bottom-4 left-2"></RiLockPasswordFill>
                        <input className="w-full p-2 pl-6 text-black rounded-lg my-1"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Type your password"
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-4">{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                    </div>
                    <hr className="my-3" />

                    <Button className=" btn btn-outline w-full" type="submit">
                        Login</Button>

                </form>

                <Social_Login></Social_Login>
                <div className="flex gap-3 justify-center mt-8">
                    <p>New to this site?</p>
                    <Link className="underline text-lg text-blue-600" to='/register'>Sign Up</Link>
                </div>
            </div>
            <div className="">
                <Lottie className="h-[630px] w-full md:w-10/12 " animationData={animation} loop={false}></Lottie>
            </div>
        </div>
    );
};

export default Login;