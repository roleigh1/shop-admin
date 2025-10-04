import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyProvider, useMyContext } from "../ContextApi";
import PropTypes from "prop-types";
import { apiConfig } from "../config/apiConfig";
export function FormSignIn() {
  const [toggle, setToggle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setToken, setUser} = useMyContext(MyProvider); 
  const navigate = useNavigate();
  
  useEffect(() => {
    if (username.length > 0 && password.length > 0) {
      setToggle("");
    }
  }, [username, password]);

    const handleLogin = async () => {

    setToggle("");
    
    try {
      const response = await fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include" 
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const userData = await response.json();
      setUser(userData);
      
     
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setToggle(error.message || "Login failed. Please try again.");
    
    }
  };
  const handleToggle = (event) => {
    event.preventDefault();
    if (username.length === 0 && password.length === 0) {
      setToggle("Please enter login data");
    } else {
      handleLogin();
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center mt-0.5 "

    >
      <div className="flex justify-center items-center flex-col">

          <div className="top bg-[grey] text-white w-[23rem] h-[5rem] rounded-t-lg">
            <h2 className="flex items-center justify-center mt-6">Sign In</h2>
          </div>
          <div className="mt-[-0.1rem] bg-[rgb(229,229,229)] w-[23rem] h-[25rem] flex items-center justify-center rounded-b-[10px]">
            <form className="flex flex-col gap-8 mb-20">
              <span>{toggle}</span>
              <label htmlFor="email" style={{marginBottom:"1rem"}}>User</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="name"
                name="username"
                className=" mt-[-2rem] h-[2rem] rounded-sm bg-white w-[15rem]"
              />
              <label htmlFor="password" style={{marginBottom:"1rem"}}>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"

                className="mt-[-2rem] h-[2rem] rounded-sm bg-white w-[15rem]"
              />
              <button className="bg-grey h-[2rem] rounded-sm font-size text-base font-semibold text-black " onClick={handleToggle}>Login</button>
            </form>
          </div>
 
      </div>
    </div>
  );
}