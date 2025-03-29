import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedUser} from "../redux/userSlice";

const MessageContainer = () => {
  const {selectedUser, authUser, onlineUsers} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const isOnline = onlineUsers.includes(selectedUser._id);

  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, []);
  return (
    <>
      {selectedUser ? (
        <div className="md:min-w-[550px] flex flex-col h-full bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-md">
          <div className="flex items-center gap-4 p-4 bg-gray-800 text-white rounded-t-lg">
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100">
                <img src={selectedUser?.profileImage} alt="User Profile" />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{selectedUser?.fullName}</p>
              <span className="text-sm text-gray-400">{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
  
          <div className="flex-1 overflow-auto px-4">
            <Messages />
          </div>
  
          <div className="p-3 bg-white/80 backdrop-blur-lg">
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl text-white">Hi, {authUser?.fullName}</h1>
          <h2 className="text-2xl text-gray-300">Start a Conversation</h2>
        </div>
      )}
    </>
  );
  
};

export default MessageContainer;
