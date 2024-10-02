import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CreatePost } from "./CreatePost";

const Header = () => {
  const [authentication, setAuthentication] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem('auth')
    console.log(auth)
    setAuthentication(auth);
  },[])
  return (
    <div className="w-full bg-slate-200 flex items-center justify-between px-4 shadow-md h-14">
      <label htmlFor="" className="font-bold">
        Logo
      </label>
      <div className="flex place-items-center gap-4">
        <NavLink
          to={"/"}
          className={({isActive})=>`font-semibold ${isActive?'text-pink-700':''} hover:text-pink-700 transition-all `}
        >
          Home
        </NavLink>
          <label htmlFor="" className={`font-semibold m-0 hover:text-pink-700 transition-all `}><CreatePost/></label>

      </div>
    </div>
  );
};

export default Header;
