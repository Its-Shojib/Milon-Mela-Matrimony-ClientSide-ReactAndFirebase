import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Social_Login = () => {

    let { googleSignIn } = useAuth();
    let navigate = useNavigate();
    let axiosPublic = useAxiosPublic();

    let handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                let userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'User Created Successfully',
                                icon: 'Success',
                                confirmButtonText: 'Cool'
                            })
                        }
                        else{
                            Swal.fire({
                                title: 'Success!',
                                text: `Welcome Back ${result.user?.displayName}`,
                                icon: 'Success',
                                confirmButtonText: 'Cool'
                            })
                        }
                    })

                navigate('/')
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
        <div>
            <p className="mt-3">Or Sign up using</p>
            <div className="flex gap-3 justify-center my-3">
                <img onClick={handleGoogleLogin} className="w-8 cursor-pointer" src="/google.jpg" alt="" />
            </div>
        </div>
    )
}
export default Social_Login;