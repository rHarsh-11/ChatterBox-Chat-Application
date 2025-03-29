import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"

const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })
  const handleCheckbox = (gender) => {
    setUser({...user, gender})  
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers : {
          "Content-Type" : 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="w-2/5 bg-gradient-to-r from-blue-500 to-purple-700 flex flex-col items-center justify-center p-12 text-white">
          <h2 className="text-4xl font-bold">Hello, Friend!</h2>
          <p className="mt-4 text-center text-lg">
            Sign in if you already have an account
          </p>
          <Link to="/login">
          <button className="mt-8 px-8 py-4 border border-white rounded-lg hover:bg-white hover:text-purple-600 transition-all">
            SIGN IN
          </button>
          </Link>
        </div>
        <div className="w-3/5 p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Create an account</h2>
          <form action="" onSubmit={onSubmitHandler}>
            <div className="mt-8">
              <input
                value = {user.fullName}
                onChange={(e) => setUser({...user, fullName : e.target.value})}
                type="text"
                placeholder="Full Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                value = {user.username}
                onChange={(e) => setUser({...user, username : e.target.value})}
                type="text"
                placeholder="Username"
                className="w-full p-4 mt-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                value = {user.password}
                onChange={(e) => setUser({...user, password : e.target.value})}
                type="password"
                placeholder="Password"
                className="w-full p-4 mt-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                value = {user.confirmPassword}
                onChange={(e) => setUser({...user, confirmPassword : e.target.value})}
                type="password"
                placeholder="Confirm password"
                className="w-full p-4 mt-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex items-center mt-5">
                <div className="flex items-center mr-3">
                  <p>Male</p>
                  <input type="checkbox" checked={user.gender === "male"} onChange={() => handleCheckbox("male")}className="checkbox checkbox-primary mx-1.5" />
                </div>
                <div className="flex items-center mx-3">
                  <p>Female</p>
                  <input type="checkbox" checked={user.gender === "female"} onChange={() => handleCheckbox("female")} className="checkbox checkbox-primary mx-1.5" />
                </div>
                <div className="flex items-center mx-3">
                  <p>Other</p>
                  <input type="checkbox" checked={user.gender === "other"} onChange={() => handleCheckbox("other")}className="checkbox checkbox-primary mx-1.5" />
                </div>
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white p-4 rounded-2xl mt-8 hover:bg-purple-700 transition-all">
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
