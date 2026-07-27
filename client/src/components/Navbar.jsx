import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, Search, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const AuthControls = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return !user ? (
    <button
      onClick={openSignIn}
      className="cursor-pointer rounded-full bg-primary px-4 py-1 font-medium transition hover:bg-primary-dull sm:px-7 sm:py-2"
    >
      Login
    </button>
  ) : (
    <UserButton />
  );
};

const Navbar = ({ authEnabled = false }) => {
  const [isopen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="h-auto w-36" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
        max-md:text-lg z-50 flex flex-col md:flex-row items-center
        max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
        min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
        border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isopen ? 'max-md:w-full' : 'max-md:w-0'}`}
      >
        <X className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(!isopen)} />

        <Link onClick={()=>{scrollTo(0,0), setIsOpen(false)}} to="/">Home</Link>
        <Link onClick={()=>{scrollTo(0,0), setIsOpen(false)}} to="/movies">Movies</Link>
        <Link onClick={()=>{scrollTo(0,0), setIsOpen(false)}} to="/">Theaters</Link>
        <Link onClick={()=>{scrollTo(0,0), setIsOpen(false)}} to="/">Releases</Link>
        <Link onClick={()=>{scrollTo(0,0), setIsOpen(false)}} to="/favorite">Favorites</Link>
      </div>

      <div className="flex items-center gap-8">
        <Search className="max-md:hidden w-6 h-6 cursor-pointer" />
        {authEnabled ? <AuthControls /> : (
          <Link
            to="/movies"
            className="rounded-full bg-primary px-4 py-1 font-medium transition hover:bg-primary-dull sm:px-7 sm:py-2"
          >
            Explore
          </Link>
        )}
      </div>

      <Menu className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" onClick={()=> setIsOpen(!isopen)} />
    </div>
  );
};

export default Navbar;
