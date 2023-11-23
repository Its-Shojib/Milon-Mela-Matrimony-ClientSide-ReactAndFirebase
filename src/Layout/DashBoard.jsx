import { NavLink, Outlet } from 'react-router-dom';
import { FaEdit, FaEye, FaHeart, FaHome, FaPhone,  FaSignOutAlt, FaUser, FaUsers, FaVoicemail, FaWineBottle } from 'react-icons/fa';
import { GiLovers } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const DashBoard = () => {
    let isAdmin = false;
    return (
        <div>
            <div className="max-w-screen-xl mx-auto flex">
                <div className="w-64 min-h-screen bg-[#D1A054]">
                    <div className='text-center my-10'>
                        <h1 className='text-3xl font-bold'>Bistro Boss</h1>
                        <p className='text-xl'>Restaurants</p>
                    </div>
                    {
                        isAdmin ? <>
                            <ul className='menu flex flex-col mt-10 px-6 space-y-3'>
                            <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='admin-home' >
                                        <FaHome></FaHome> Admin Home</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='manage-user' >
                                        <FaUsers></FaUsers> Manage Users</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='approve-con-request' >
                                        <FaVoicemail></FaVoicemail>Approve Cont. Request</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='approve-premium' ><MdOutlineWorkspacePremium />Approve Premium</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='success-story' ><FaWineBottle></FaWineBottle>Success Story</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' ><FaSignOutAlt></FaSignOutAlt> Logout</NavLink>
                                </li>
                            </ul>
                        </> : <>
                            <ul className='flex flex-col mt-10 px-6 space-y-3'>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='edit-biodata' >
                                        <FaEdit></FaEdit> Edit Bio-Data</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='view-bio-data' >
                                        <FaEye></FaEye> View Bio-Data</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='my-req-contacts' >
                                        <FaUser></FaUser> My Req. Contacts</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='favorites' ><FaHeart></FaHeart> Favorites</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' 
                                    to='got-married' ><GiLovers></GiLovers>Got Married</NavLink>
                                </li>
                                <li >
                                    <NavLink className='flex items-center font-bold gap-2' ><FaSignOutAlt></FaSignOutAlt> Logout</NavLink>
                                </li>
                            </ul>
                        </>
                    }

                    <hr className='divider divider-horizontal w-full my-5' />

                    <ul className='menu flex flex-col px-6 space-y-3'>
                        <li >
                            <NavLink className='flex items-center font-bold gap-2' 
                            to='/' >
                                <FaHome></FaHome>Home</NavLink>
                        </li>
                        <li >
                            <NavLink className='flex items-center font-bold gap-2' 
                            to='/biodatas' >
                                <FaUsers></FaUsers>Bio-Datas</NavLink>
                        </li>
                        <li >
                            <NavLink className='flex items-center font-bold gap-2' 
                            to='/about-us' >
                                <TbListDetails />About-Us</NavLink>
                        </li>
                        <li >
                            <NavLink className='flex items-center font-bold gap-2' 
                            to='/contact-us' >
                                <FaPhone></FaPhone>Contact-Us</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 bg-gray-200">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    )
}
export default DashBoard;