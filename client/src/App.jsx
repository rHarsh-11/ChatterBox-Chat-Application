import React, { useEffect, useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice.js'
import { setOnlineUsers } from './redux/userSlice.js'

const router = createBrowserRouter([
  {
    path : "/",
    element : <HomePage/>
  },
  {
    path : "/register",
    element : <Signup/>
  },
  {
    path : "/login",
    element : <Login/>
  },
])

const App = () => {
  const {authUser} = useSelector(store => store.user);
  const {socket} = useSelector(store => store.socket)
  const dispatch = useDispatch();

  useEffect(() => {
    if(authUser){
      const socket = io('http://localhost:8080', {
        query: {
          userId : authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
  
}

export default App