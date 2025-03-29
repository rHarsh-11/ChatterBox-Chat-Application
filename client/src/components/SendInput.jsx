import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const {selectedUser} = useSelector(store => store.user);
  const {messages} = useSelector(store => store.messages)
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message}, {
        headers: {
          "Content-Type" : 'application/json'
        },
        withCredentials: true
      });
      dispatch(setMessages([...messages, res?.data?.newMessage]))
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  }
  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="input input-bordered w-full rounded-full bg-white/80 backdrop-blur-lg shadow-md text-gray-700 px-4 py-3 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary hover:text-primary-focus"
        >
          <IoSend className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
  
}

export default SendInput