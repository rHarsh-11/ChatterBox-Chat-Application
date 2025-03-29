import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
        headers : {
          "Content-Type" : 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    setUser({
      username: "",
      password: "",
    })
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-5xl bg-white shadow-lg overflow-hidden rounded-4xl mx-3">
          <form action="" onSubmit={onSubmitHandler}>
            <div className="w-2.5/5 p-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Sign In</h2>
              <div className="mt-8">
                <input
                  value={user.username}
                  onChange={(e) =>setUser({...user, username: e.target.value})}
                  type="text"
                  placeholder="Username"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  value={user.password}
                  onChange={(e) =>setUser({...user, password: e.target.value})}
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 mt-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button type="submit" className="w-full bg-purple-600 text-white p-4 rounded-2xl mt-8 hover:bg-purple-700 transition-all">
                  SIGN IN
                </button>
              </div>
            </div>
          </form>

          <div className="w-2.5/5 bg-gradient-to-r from-blue-500 to-purple-700 flex flex-col items-center justify-center p-12 text-white">
            <h2 className="text-4xl font-bold">Hello, Friend!</h2>
            <p className="mt-4 text-center text-lg">
              Register with your personal details if you don't have an account to use all of the site features
            </p>
            <Link to="/register">
            <button className="mt-8 px-8 py-4 border border-white rounded-lg hover:bg-white hover:text-purple-600 transition-all">
              SIGN UP
            </button>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default Login;
