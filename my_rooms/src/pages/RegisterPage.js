import React, { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const Register = async () => {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        const result = (await axios.post(`/api/users/register`, user)).data;
        setSuccess(result);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    } else {
      alert("Please Match the Password");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="registerContainer">
      {loading && <Loading></Loading>}
      {error.length > 0 && <Error msg={error}></Error>}
      <div className="registerBox">
        {success.length > 0 && <Success msg={success}></Success>}
        <div className="registerTitle">
          <h1>Register</h1>
        </div>
        <div className="registerInputdiv">
          <input
            className="registerInput"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            style={{ marginTop: 30 }}
            className="registerInput"
            type="password"
            placeholder="Confirm Your Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        </div>
        <div className="registerButton">
          {loading ? (
            <div>registering please wait...</div>
          ) : (
            <button onClick={Register}>Register</button>
          )}
        </div>

        <div className="registerLogin">
          <Link to={"/login"} className="reglog">
            Already have account Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
