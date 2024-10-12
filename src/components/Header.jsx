import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { useSelector } from "react-redux";

const Header = () => {
  const { accessToken } = useSelector((store)=>store.tokenSlice)
  const [authentication, setAuthentication] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem('auth')
    setAuthentication(auth);
  },[])

  const handleLogin = async() => {
    let response = await fetch('http://localhost:3000/login')
    response = await response.json()

  }
  return (
    <div className="w-full bg-slate-200 flex items-center justify-between px-4 shadow-md h-14">
      <label htmlFor="" className="font-bold">
        Logo
      </label>
      <div className="flex place-items-center gap-4">
        {accessToken && <NavLink
          to={"/"}
          className={({isActive})=>`font-semibold ${isActive?'text-pink-700':''} hover:text-pink-700 transition-all `}
        >
          Home
        </NavLink>}
          {accessToken && <label htmlFor="" className={`font-semibold m-0 hover:text-pink-700 transition-all `}><CreatePost/></label>}
          {!accessToken && <a className="mb-0" href={`https://www.facebook.com/v21.0/dialog/oauth?client_id= ${import.meta.env.VITE_CLIENT_ID}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=http://localhost:5173/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`}>Login</a>}
      </div>
    </div>
  );
};

export default Header;
