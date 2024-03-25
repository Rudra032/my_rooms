import React, { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const Login = async () => {
    const user = {
      email,
      password,
    };
    try {
      const result = (await axios.post(`/api/users/login`, user)).data;
      console.log(result);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="registerContainer">
      {loading && <Loading></Loading>}
      <div className="registerBox">
        {error.length > 0 && <Error msg={error}></Error>}
      {success.length > 0 && <Success msg={success}></Success>}

        <div className="registerTitle" style={{ marginTop: 50 }}>
          <h1>Login</h1>
        </div>
        <div className="registerInputdiv" style={{ marginTop: 30 }}>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="registerInput"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="toggleEyeButton"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="registerButton" style={{ marginTop: 50 }}>
          {loading ? (
            <div>Login...Please Wait...</div>
          ) : (
            <button onClick={Login}>LogIn</button>
          )}
        </div>
        <div className="registerLogin">
          <Link to={"/register"} className="reglog">
            Din't have account Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
