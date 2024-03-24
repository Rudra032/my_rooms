import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Compo.css";
import { FaUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const ToggleDropDown = () => {
    setDropDown(prevState => !prevState);
  };

  const Logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <>
      {user ? (
        <div className="navBar">
          <div className="logo">
            <h1><a href="/home">MyRooms</a></h1>
          </div>
          <div className="navButtonsDiv navButtonsDivExtra">
            <div className="userDiv" onClick={ToggleDropDown}>
              <FaUser />
            </div>
            <div className="userNameDiv">
              <p className="userName">{user.name}</p>
            </div>

            {dropDown && (
              <div className="dropDownDiv">
                <Link to="/profile" className="dropDownEle" >
                  Profile
                </Link>
                <a className="dropDownEle"  onClick={Logout}>
                  Logout <IoIosLogOut />
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="navBar">
          <div className="logo">
            <h1>MyRooms</h1>
          </div>
          <div className="navButtonsDiv">
            <Link to="/login" className="navBtn">
              Login
            </Link>
            <Link to="/register" className="navBtn">
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
