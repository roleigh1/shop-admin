import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

export function FormSignIn({ onTokenReceived }) {
  const [toggle, setToggle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setToggle("");
    }
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3131/api/login", {
        username: email,
        password: password,
      });

      const retrievedToken = response.data.token;

      onTokenReceived(retrievedToken);
      console.log("Login successful", response.data);
      navigate("/home");
    } catch (error) {
      console.log("Login failed", error);
      setToggle("wrong username or password");
    }
  };

  const handleToggle = (event) => {
    event.preventDefault();
    if (email.length === 0 && password.length === 0) {
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className=" mt-[-2rem] h-[2rem] rounded-sm bg-white w-[15rem]"
              />
              <label htmlFor="password" style={{marginBottom:"1rem"}}>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"

                className="mt-[-2rem] h-[2rem] rounded-sm bg-white w-[15rem]"
              />
              <button className="bg-grey h-[2rem] rounded-sm font-size text-base font-semibold text-white " onClick={handleToggle}>Login</button>
            </form>
          </div>
 
      </div>
    </div>
  );
}
FormSignIn.propTypes = {
  onTokenReceived: PropTypes.func.isRequired,
};
