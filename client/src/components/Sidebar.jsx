import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice.js';
 
const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {otherUsers} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try{
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`)

      navigate("/login")
      toast.success(res.data.message);
      dispatch(setAuthUser(null));

    }catch(error){
      console.log(error)
    }
  }

  const searchSubmitHandler = (e) => {
     e.preventDefault();
     const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
     if(conversationUser){
      dispatch(setOtherUsers([conversationUser]));
     }else{
      toast.error("User not found")
     }
  }

  return (
    <div className="border-r border-gray-300 p-4 flex flex-col bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-md">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2 mb-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full rounded-full bg-gray-100 text-gray-700 focus:outline-none"
        />
        <button type="submit" className="btn btn-primary rounded-full">
          <BiSearchAlt2 className="w-6 h-6" />
        </button>
      </form>
      <div className="divider"></div>
      <OtherUsers />
      <div className="mt-4">
        <button onClick={logoutHandler} className="btn btn-outline btn-error rounded-full">
          Logout
        </button>
      </div>
    </div>
  );
  
}

export default Sidebar