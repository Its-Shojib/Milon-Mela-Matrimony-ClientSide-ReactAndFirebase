import { Navbar, Typography, Button, IconButton, Collapse } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import img from '../assets/Home/MilonMela.png'
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const MyNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  let { user, Logout } = useAuth();
  let [isAdmin] = useAdmin()
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
      <Typography
        as="li"
        variant="h6"

        className="p-1 font-normal"
      >
        <Link to='/' className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        className="p-1 font-normal"
      >
        <Link to='/biodatas' className="flex items-center">
          Biodatas
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"

        className="p-1 font-normal"
      >
        <Link to='/about-us' className="flex items-center">
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"

        className="p-1 font-normal"
      >
        <Link to='/contact-us' className="flex items-center">
          Contact us
        </Link>
      </Typography>

      {
        user && isAdmin ? <><Typography as="li" variant="h6" className="p-1 font-normal">
          <Link to='/dashboard/admin-home' className="flex items-center">
            Dashboard
          </Link>
        </Typography></> : <></>
      }
      {
        user && !isAdmin ? <><Typography as="li" variant="h6" className="p-1 font-normal">
          <Link to='/dashboard/view-bio-data' className="flex items-center">
            Dashboard
          </Link>
        </Typography></> : <></>
      }
      {
        user ? <><Typography
          as="li"
          variant="h6"
          className="p-1 font-normal"
        >
          <Button onClick={() => Logout().then().catch()} className="flex items-center">
            Signout
          </Button>
        </Typography></> : <><Typography
          as="li"
          variant="h6"
          className="p-1 font-normal"
        >
          <Link to='/login' className="flex items-center">
            Login
          </Link>
        </Typography></>
      }
    </ul >
  );


  return (
    <Navbar className="fixed top-0 z-10 h-max bg-blue-gray-900 max-w-screen-xl">
      <div className="flex items-center justify-between ">
        <img className="w-64 h-12" src={img} alt="" />
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="">
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="">
            <span>Sign in</span>
          </Button>
        </div>
      </Collapse >
    </Navbar>
  )
}
export default MyNavbar;