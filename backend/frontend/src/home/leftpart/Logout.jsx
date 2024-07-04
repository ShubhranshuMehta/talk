import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie"
import toast from 'react-hot-toast';


function Logout() {
    const [loading, setLoading] = useState(false);
    const handleLogOut = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/user/logout")
            localStorage.removeItem("Talk");
            Cookies.remove("jwt");
            setLoading(false);
            toast.success("logged out successfully");
            window.location.reload();
        } catch (error) {
            console.log("error in logot: " + error);
            toast.error("error in logging out")
        }
    }
    return (
        <div className='h-[8vh] items-center'>
            <div>
                <RiLogoutCircleLine className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full px-2 py-2 ml-2 mt-1'
                    onClick={handleLogOut} />

            </div>
        </div>
    )
}

export default Logout