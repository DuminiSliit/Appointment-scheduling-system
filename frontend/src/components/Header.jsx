import React, { useState } from "react";
import { Link } from "react-router-dom"; // if you're using React Router
import youtube from "../img/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSilce"; // Import the action to handle sign-out

export default function Header() {



    const [activeLink, setActiveLink] = useState("");
    const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state
    const dispatch = useDispatch(); // Get dispatch function from Redux
  
  
  
    const handleSignout = async () => {
      try {
        const res = await fetch('/api/auth/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    <div className="bg-blue-600">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-4">
        
        {/* Logo Section */}
        <div>
          <img src={youtube} alt="Logo" className="h-10" />
        </div>
        
        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
          {/* Home Link */}
          <li>
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          
          {/* About Link */}
          <li>
            <Link to="/about" className="text-white hover:text-gray-400">
              About
            </Link>
          </li>
          
          {/* Services Link */}
          <li>
            <Link to="/services" className="text-white hover:text-gray-400">
              Services
            </Link>
          </li>
          
          {/* Contact Link */}
          <li>
            <Link to="/mya" className="text-white hover:text-gray-400">
              my appointment
            </Link>
          </li>

          {currentUser ? (
        <div className="flex items-center ml-auto">
          <Link to="/profile" className="flex items-center">
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <button
            onClick={handleSignout}
            className="text-white px-3 py-1 rounded-lg text-base md:text-lg font-serif hover:bg-blue-800 transition"
          >
            LogOut
          </button>
        </div>
      ) : (
       <>
       </>
      )}
        </ul>
      </div>
    </div>
  );
}

